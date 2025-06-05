import { defineStore } from "pinia";
import type { Post } from "~/types";

const usePostStore = defineStore("postStore", {
    /**
     *  ****************** User State ******************
     */
    state: (): {
      posts: null | Post[];
      totalPosts: number;
      limit: number;
      skip: number;
      currentPage: number;
      totalPages: number;
      loading: boolean;
    } => ({
      posts: null,
      totalPosts: 0,
      limit: 9,
      skip: 0,
      currentPage: 1,
      totalPages: 0,
      loading: false
    }),
  
    /**
     *  ****************** Getters ******************
     */
    getters: {
      getPosts: (state) => state.posts,
      getTotalPages: (state) => state.totalPages,
      getCurrentPage: (state) => state.currentPage,
      getLoading: (state) => state.loading
    },
    /**
     *  ****************** All Actions ******************
     */
    actions: {
        async fetchPosts(page: number = 1) {
            try {
                this.loading = true;
                this.currentPage = page;
                this.skip = (page - 1) * this.limit;
                
                const response = await useFetch(`https://dummyjson.com/posts?limit=${this.limit}&skip=${this.skip}`);
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
        
        goToPage(page: number) {
            if (page >= 1 && page <= this.totalPages) {
                this.fetchPosts(page);
            }
        },
        
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.fetchPosts(this.currentPage + 1);
            }
        },
        
        prevPage() {
            if (this.currentPage > 1) {
                this.fetchPosts(this.currentPage - 1);
            }
        }
    }  
  });

export default usePostStore;