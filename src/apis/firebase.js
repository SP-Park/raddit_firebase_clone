import { isEmpty } from "class-validator";
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, 
    onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, 
    signInWithPopup, signOut, updateProfile 
} from 'firebase/auth'
import { 
    doc, getDoc, setDoc, increment, getFirestore, addDoc, 
    collection, runTransaction, serverTimestamp, getDocs, writeBatch, updateDoc, query, where, orderBy, deleteDoc, limit 
} from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { get, getDatabase, set } from 'firebase/database'
import { FIREBASE_ERRORS } from "./errors";

import md5 from "md5";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app)
const storage = getStorage(app)
const db = getDatabase(app)
const auth = getAuth()

export async function signup(email, name, password) {
    try {
        let errors = {}
        if(isEmpty(name)) errors.name = '이름은 비워둘 수 없습니다.'
        if(isEmpty(email)) errors.email = '이메일은 비워둘 수 없습니다.'

    // TODO: 커뮤니티 이름 중복 체크 

        if (Object.keys(errors).length > 0) {
            throw errors;
        }

    } catch (error) {
        console.log(error);
        return { ...error, error: true }
    }

    try {

        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user)
        await updateProfile(user, {
            displayName: name,
            photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`
        })
        // await set(ref(db, `users/${user.uid}`), {
        //     name: user.displayName,
        //     avatar: user.photoURL
        // })

        const userDocRef = doc(firestore, 'users', user.uid)
        await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            providerDate: user.providerData
        })
        // 아래와 같이 user를 객체화 해서 넣어주는 방법도 가능
        // await addDoc(collection(firestore, 'users'), JSON.parse(JSON.stringify(user)))


        return user

    } catch (error) {
        console.log(error.message)
        // alert(`가입이 실패 하였습니다. ${error}`)
        const message = FIREBASE_ERRORS[error.message]
        return { error, message }
    }
}

export async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
    .then((UserCredential) => {
        const user =  UserCredential.user
        return { ...user }
    })
}

export async function loginWithG() {
    return signInWithPopup(auth, provider)
    .catch(console.error)  
}

export async function addFirestore(user) {
    const userDocRef = doc(firestore, 'users', user.uid)
    // return setDoc(userDocRef, JSON.parse(JSON.stringify(user)))
    await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerDate: user.providerData
    })
}

export function onUserChange(callback) {
    onAuthStateChanged(auth, async (user) => {
      const updatedUser = user ? await user : null
      callback(updatedUser)
    })
}

export function resetPassword(email) {
    sendPasswordResetEmail(auth, email)
    .catch(console.error)
}

export function logout() {
    console.log('logout!');
    signOut(auth).catch(console.error)
}

export async function createCommunity(user, community, type) {
    try {
        const communityDocRef = doc(firestore, 'community', community)

        const res = await runTransaction(firestore, async (transaction) => {
            // check if community exists in db
            const communityDoc = await transaction.get(communityDocRef)
            if(communityDoc.exists()) {
                // const message = 'Sorry the name is taken. Try another.'
                // return message
                throw new Error('Sorry the name is taken. Try another.')
            }
            // create
            transaction.set(communityDocRef, {
                creatorId: user?.uid,
                name: community,
                createAt: serverTimestamp(),
                numberOfMembers: 1,
                privacyType: type
            })

            // create community Snippet on user
            transaction.set(
                doc(firestore, `users/${user?.uid}/communitySnippets`, community), 
                {
                communityId: community,
                isModerator: true
                }
            )
        })
        console.log(res)
        return res

        //// Before Transaction ////
        // // check if community exists in db
        // const communityDoc = await getDoc(communityDocRef)
        // if(communityDoc.exists()) {
        //     // const message = 'Sorry the name is taken. Try another.'
        //     // return message
        //     throw new Error('Sorry the name is taken. Try another.')
        // }
        // // create
        // const res = await setDoc(communityDocRef, {
        //     creatorId: user?.uid,
        //     createAt: serverTimestamp(),
        //     numberOfMembers: 1,
        //     privacyType: type
        // })
        // return res
    } catch (error) {
        console.log('community creation error: ', error);
        return error.message
    }
}

export async function getCommunity(communityId) {
    // console.log(communityId)
    const communityDocRef = doc(firestore, 'community', communityId)
    const docSnap = await getDoc(communityDocRef) 
    if(docSnap.exists()) {
        return docSnap.data()
    } else {
        const message = 'No such community!'
        return message
    }
}

export async function getAllCommunities() {
    const docSnap = await getDocs(collection(firestore, 'community')) 
    const communities = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return communities
}

export async function getMySnippets(user) {
    const Docs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`))
    const snippets = Docs.docs.map((doc) => ({ ...doc.data() }))
    // const snippets = Docs.map((doc) => ({ ...doc.data() }))
    return snippets
}

export async function getMyVote(user) {
    const Docs = await getDocs(collection(firestore, `users/${user?.uid}/postVotes`))
    const snippets = Docs.docs.map((doc) => ({ ...doc.data() }))
    // const snippets = Docs.map((doc) => ({ ...doc.data() }))
    return snippets
}

export async function joinCommunity(community, user) {
    
    try {
        console.log('joinCommunity come!!!!!')
        // create a new community snippet
        const batch = writeBatch(firestore)        
        const newSnippet = {
            communityId: community.name,
            imageURL: community.imageURL || '',
            isModerator: user?.uid === community.creatorId
        }
        batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, community.name), newSnippet)
        
        // updating the numberOfMembers
        batch.update(doc(firestore, 'community', community.name), {
            numberOfMembers: increment(1)
        })

        await batch.commit()

        return newSnippet

    } catch(error) {
        console.error('joinCommunity error: ', error)
        return error.message
    }
}

export async function leaveCommunity(communityId, user) {  
    try {
        console.log('leaveCommunity come!!!!!')
        // delete community snippet
        const batch = writeBatch(firestore)
        batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId))

        // updating numberofMembers(-1)
        batch.update(doc(firestore, 'community', communityId), {
            numberOfMembers: increment(-1)
        })
        await batch.commit()
        return communityId

    } catch (error) {
        console.error('leaveCommunity error: ', error)
        return error.message
    }
}

export async function getRecommendationCommunity() {
    try {

        const communityQuery = query(collection(firestore, 'community'),
        orderBy('numberOfMembers', 'desc'),
        limit(5)
        )
        const communityDocs = await getDocs(communityQuery)
        const communites = communityDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        return communites

    } catch (error) {
        console.log('getRecommendationCommunity error', error)
        return false
    }
}

export async function createPost(newPost, selectedFile) {
    try {
        
        const Post = {
            ...newPost,
            createdAt: serverTimestamp()
        }
        // store the post in db
        const postDocRef = await addDoc(collection(firestore, 'posts'), Post)
        
        // check for selectedFile
        if(selectedFile) {
            // store in storage => getDownloadURL (return imageURL)
            const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
            await uploadString(imageRef, selectedFile, 'data_url')
            const downloadURL = await getDownloadURL(imageRef)

            // update post doc by adding imageURL
             await updateDoc(postDocRef, {
                imageURL: downloadURL
            })
        }

        return 'success'
        
    } catch (error) {
        console.error('createPost Error: ', error.message)
        return error.message
    }
}

export async function getPosts(community) {
    try {
        // get posts for this community
        const postQuery = query(collection(firestore, 'posts'), 
            where('communityId', '==', community.name),
            orderBy('createdAt', 'desc')
            )
        const postDocs = await getDocs(postQuery)
        // store in post state
        const posts = postDocs.docs.map((it) => ({ id: it.id, ...it.data() }))
        // console.log('posts: ', posts)
        return posts

    } catch (error) {
        console.error('getPosts Error: ', error.message)
        return error.message
    }
}

export async function getNoUserFeed() {
    const postQuery = query(collection(firestore, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10)
    )
    const postDocs = await getDocs(postQuery)
    const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return posts
}

export async function getUserFeed(communityId) {
    const postQuery = query(collection(firestore, 'posts'),
    where('communityId', 'in', communityId),
    limit(10)
    )
    const postDocs = await getDocs(postQuery)
    const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return posts
}

export async function deletePost(post) {
    try {
    // check if image, delete if exists
    if(post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`)
        await deleteObject(imageRef)
    }
    // delete post document from firestore
    const postDocRef = doc(firestore, 'posts', post.id)
    await deleteDoc(postDocRef)
    // update recoil stste
    return post.id
    } catch (error) {
        return false
    }
}

export async function changeImage(selectedFile, communityId) {
    // console.log(selectedFile, communityId)
    try {
        // store in storage => getDownloadURL (return imageURL)
        const imageRef = ref(storage, `community/${communityId}/image`)
        await uploadString(imageRef, selectedFile, 'data_url')
        const downloadURL = await getDownloadURL(imageRef)
        // console.log('downloadURL', downloadURL)
        // update community doc by adding imageURL
         await updateDoc(doc(firestore, 'community', communityId), {
            imageURL: downloadURL
        })
        return downloadURL
    } catch (error) {
        console.error(error.message)
        return false
    }
}

export async function onVote(user, post, vote, postStateValue, communityId) {

    // PostValue = { id, postId, communityId, voteValue }  
    // PostState = { selectedPost, posts, postVotes }
    // PostVote (in User) = { id, postId, communityId, voteValue }  authContext (user)
    console.log('INPUT: ', post, vote, communityId)

    // check for a user => if not, open auth modal
    // console.log('voteState: ', voteState)
    try {
        const { voteStatus } = post
        // user.PostVote 안에 현재 user 가 vote를 햇는지 여부를 확인함 
        const existingVote = postStateValue.postVotes?.find((vote) => vote.postId === post.id)
        // console.log('existingVote: ', existingVote)
        const batch = writeBatch(firestore)
        let updatedPost = { ...post }
        // const updatedPosts = [ ...postStateValue ]
        let updatedPostVotes = [ ...postStateValue.postVotes ]  //user.postvote
        let voteChange = vote

        // New vote
        if(!existingVote) {
            // create a new postVote document
            const postVoteRef = doc(collection(firestore, 'users', `${user?.uid}/postVotes`))
            const newVote = {
                id: postVoteRef.id,
                postId: post.id,
                communityId,
                voteValue: vote //1 or -1
            }
            console.log(newVote)
            batch.set(postVoteRef, newVote)

            // add/subract 1 to/from post.voteStatus
            updatedPost.voteStatus = voteStatus + vote
            updatedPostVotes = [ ...updatedPostVotes, newVote ]
        }
            // Existing vote - they have voted on the post before
         else {
            const postVoteRef = doc(firestore, 'users', `${user?.uid}/postVotes/${existingVote.id}`)

            // Removing their vote (up => neutral Or down => neutral)
            if(existingVote.voteValue === vote) {
                // add/subract 1 to/from post.voteStatus
                updatedPost.voteStatus = voteStatus - vote
                updatedPostVotes = updatedPostVotes.filter(vote => vote.id !== existingVote.id)
            
            // delete the postVote document
                batch.delete(postVoteRef)
                voteChange *= -1
            } else {
                // Flipping their vote (up => down OR down => up)
            
                // add/subract 2 to/from post.voteStatus
                updatedPost.voteStatus = voteStatus + 2 * vote
                
                const voteIdx = postStateValue.postVotes.findIndex((vote) => vote.id === existingVote.id)
                
                updatedPostVotes[voteIdx] = {
                    ...existingVote,
                    voteValue: vote
                }
                console.log('updatedPostVotes', updatedPostVotes)

                // updating the existing postVotes document
                batch.update(postVoteRef, {
                    voteValue: vote  
                })
                voteChange = 2 * vote
            }
        }

        // updating state with updated values
        // const postIdx = postStateValue.posts.findIndex((item) => item.id === post.id)
        // updatedPosts[postIdx] = updatedPost
        // setPostStateValue((prev) => ({
        //     ...prev,
        //     posts: updatedPost,
        //     postVotes: updatedPostVotes
        // }))

        // update our post documnet
        const postRef = doc(firestore, 'posts', post.id)
        batch.update(postRef, { voteStatus: voteStatus + voteChange })

        await batch.commit()
        return { updatedPost, updatedPostVotes }

    } catch (error) {
        console.log('onVote error: ', error.message)
        return error.message
    }
}

// Comment : { id, creatorId, creatorDisplayText, communityId, postId, postTitle, text, createdAt }
export async function onCreateComment(user, post ,communityId, commentText) {
    
    try {
        const batch = writeBatch(firestore)
        // create a comment documment
        const commentDocRef = doc(collection(firestore, 'comments'))
        const newComment = {
            id: commentDocRef.id,
            creatorId: user.uid,
            creatorDisplayText: user.email.split('@')[0],
            communityId,
            postId: post.id,
            postTitle: post.title,
            text: commentText,
            createdAt: serverTimestamp()
        }

        batch.set(commentDocRef, newComment)

        // update post numberOfComments +1
        const postDocRef = doc(firestore, 'posts', post.id)
        batch.update(postDocRef, {
            numberOfComments: increment(1)
        })

        await batch.commit()

        // update client recoil state
        return newComment

    } catch (error) {
        console.log('onCreateComment error: ', error.message)
        return error.message
    }
}

export async function onDeleteComment(comment, post) {
    console.log(comment)
    // update client recoil state
    try {
        const batch = writeBatch(firestore)
        // delete a comment documment
        const commentDocRef = doc(firestore, 'comments', comment.id)
        batch.delete(commentDocRef)

        // update post numberOfComments -1
        const postDocRef = doc(firestore, 'posts', post.id)
        batch.update(postDocRef, {
            numberOfComments: increment(-1)
        })

        const result = comment.id
        await batch.commit()
        return result

    } catch (error) {
        console.log('onDeleteComment error: ', error.message)
        return error.message
    }
}

export async function getCommnets(post) {
    try {
        const commentQuery = query(collection(firestore, 'comments'), 
        where('postId', '==', post.id),
        orderBy('createdAt', 'desc')
        )
        const commentDocs = await getDocs(commentQuery)
        const comments = commentDocs.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
        // console.log(comments)
        return comments
    } catch (error) {
        console.log('getCommnets error', error.message)
        return error.message
    } 
}