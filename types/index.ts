export interface Post {
    "id": number,
    "title": string,
    "body": string,
    "tags": string[],
    "reactions": {
        "likes": number,
        "dislikes": number
    },
    "views": number,
    "userId": number
}

export interface Comment {
    "id": number,
    "body": string,
    "postId": number,
    "likes": number,
    "user": {
      "id": number,
      "username": string,
      "fullName": string
    }
}