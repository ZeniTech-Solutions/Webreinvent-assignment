import { defineStore } from "pinia";
import type { Post, Comment } from "~/types";

const usePostStore = defineStore("postStore", {
    /**
     *  ****************** User State ******************
     */
    state: (): {
      posts: null | Post[];
      currentPost: Post | null;
      comments: Comment[] | null;
      totalPosts: number;
      limit: number;
      skip: number;
      currentPage: number;
      totalPages: number;
      loading: boolean;
      postLoading: boolean;
    } => ({
      posts: null,
      currentPost: null,
      comments: null,
      totalPosts: 0,
      limit: 9,
      skip: 0,
      currentPage: 1,
      totalPages: 0,
      loading: false,
      postLoading: false
    }),
  
    /**
     *  ****************** Getters ******************
     */
    getters: {
      getPosts: (state) => state.posts,
      getTotalPages: (state) => state.totalPages,
      getCurrentPage: (state) => state.currentPage,
      getLoading: (state) => state.loading,
      getCurrentPost: (state) => state.currentPost,
      getComments: (state) => state.comments,
      getPostLoading: (state) => state.postLoading
    },
    /**
     *  ****************** All Actions ******************
     */
    actions: {
        /**
         * Function to fetch all posts
         * 
         * @param page 
         */
        async fetchPosts(page: number = 1) {
            try {
                this.loading = true;
                this.currentPage = page;
                this.skip = (page - 1) * this.limit;
                
                const response = await useFetch(`https://dummyjson.com/posts?limit=${this.limit}&skip=${this.skip}`, {
                    cache: 'force-cache',
                });
                const data = response.data.value as any;
                
                this.posts = data.posts as Post[];
                this.totalPosts = data.total;
                this.totalPages = Math.ceil(this.totalPosts / this.limit);
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        
        /**
         * Function to fetch a post by ID
         * 
         * @param postId 
         */
        async fetchPostById(postId: number) {
            try {
                this.postLoading = true;
                this.currentPost = null;
                this.comments = null;
                
                const response = await useFetch(`https://dummyjson.com/posts/${postId}`, {
                    cache: 'force-cache',
                });
                const data = response.data.value as Post;
                
                this.currentPost = data;
                
            } catch (error) {
                console.error(error);
            } finally {
                this.postLoading = false;
            }
        },
        
        /**
         * Function to fetch comments for a post
         * 
         * @param postId 
         */
        async fetchComments(postId: number) {
            try {
                const response = await useFetch(`https://dummyjson.com/posts/${postId}/comments`, {
                    cache: 'force-cache',
                });
                const data = response.data.value as any;
                
                this.comments = data.comments as Comment[];
            } catch (error) {
                console.error(error);
                this.comments = [];
            }
        },
        
        /**
         * Function to get a particular page
         * 
         * @param page 
         */
        goToPage(page: number) {
            if (page >= 1 && page <= this.totalPages) {
                this.fetchPosts(page);
            }
        },
        
        /**
         * Function to get the next page
         */
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.fetchPosts(this.currentPage + 1);
            }
        },
        
        /**
         * Function to get the previous page
         */
        prevPage() {
            if (this.currentPage > 1) {
                this.fetchPosts(this.currentPage - 1);
            }
        },

        /**
         * Function to set the current post and fetch comments
         * @param post 
         */
        setCurrentPost(post: Post) {
            this.fetchComments(post.id);
            this.currentPost = post;
        }
    }  
  });

export default usePostStore;