import PostRepository from './postsRepository';

const repositories = {
    posts: PostRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
}