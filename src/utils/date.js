import koLocal from 'timeago.js/lib/lang/ko'
import { format, register } from 'timeago.js' 

register('ko', koLocal)

export function formatAgo(date, lang='en_US') {
    return format(date, lang)
}