import Repository from './Repository';

export default {
    get(resource, offset, limit = 10){
        return Repository.get(`${resource}?offset=${offset}&limit=${limit}`);
    },
    getPost(resource, postId){
        return Repository.get(`${resource}/${postId}`);
    }
}