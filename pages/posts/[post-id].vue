<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="getPostLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <!-- Post Content -->
      <div v-else-if="currentPost" class="">
        <NuxtLink to="/posts" class="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeftIcon class="h-5 w-5 mr-2" />
          Back to Posts
        </NuxtLink>
  
        <div class="flex flex-col lg:flex-row gap-8">
          <div class="lg:w-2/3">
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="p-6">
                <h1 class="text-3xl font-bold mb-4">{{ currentPost.title }}</h1>
  
                <div class="flex flex-wrap gap-2 mb-4">
                  <span 
                    v-for="tag in currentPost.tags" 
                    :key="tag" 
                    class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    #{{ tag }}
                  </span>
                </div>
  
                <div class="max-w-none">
                  <p class="text-gray-700 whitespace-pre-line">{{ currentPost.body }}</p>
                </div>
  
                <div class="flex items-center text-sm text-gray-500 mt-16 space-x-4">
                  <span class="flex items-center">
                    <HandThumbUpIcon class="h-4 w-4 mr-1" />
                    {{ currentPost.reactions.likes }} likes
                  </span>
                  <span class="flex items-center">
                    <HandThumbDownIcon class="h-4 w-4 mr-1" />
                    {{ currentPost.reactions.dislikes }} dislikes
                  </span>
                  <span class="flex items-center">
                    <EyeIcon class="h-4 w-4 mr-1" />
                    {{ currentPost.views }} views
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-6">Comments ({{ comments?.length || 0 }})</h2>
                
                <div v-if="comments && comments.length > 0" class="space-y-6">
                  <div 
                    v-for="comment in comments" 
                    :key="comment.id" 
                    class="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                  >
                    <div class="flex items-start">
                      <div class="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4">
                        {{ comment.user.username.charAt(0).toUpperCase() }}
                      </div>
                    
                      <div class="flex-1">
                        <div class="flex items-center mb-2">
                          <h3 class="font-semibold text-gray-900">{{ comment.user.fullName }}</h3>
                        </div>
                        <p class="text-gray-700">{{ comment.body }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div v-if="hasMoreComments" class="text-center mt-4">
                    <button 
                      @click="showAllComments = !showAllComments" 
                      class="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {{ showAllComments ? 'Show Less Comments' : 'Show More Comments' }}
                    </button>
                  </div>
                </div>
                
                <div v-else class="text-center py-8">
                  <p class="text-gray-500">No comments yet.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="lg:w-1/3">
            <div class="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div class="p-6">
                <h2 class="text-xl font-bold mb-4">Similar Posts</h2>
                
                <div v-if="similarPosts && similarPosts.length > 0" class="space-y-4">
                  <div v-for="post in similarPosts" :key="post.id" class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div @click="() => {postStore.setCurrentPost(post); navigateTo(`/posts/${post.id}`)}" class="block cursor-pointer hover:bg-gray-50 transition-colors rounded-md p-2 -mx-2">
                      <h3 class="font-medium text-gray-900 mb-1 line-clamp-2">{{ post.title }}</h3>
                      
                      <div class="flex flex-wrap gap-1 mb-2">
                        <span 
                          v-for="tag in post.tags" 
                          :key="tag" 
                          class="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full"
                        >
                          #{{ tag }}
                        </span>
                      </div>
                      
                      <p class="text-sm text-gray-600 line-clamp-2">{{ post.body }}</p>
                    </div>
                  </div>
                </div>
                
                <div v-else class="text-center py-4">
                  <p class="text-gray-500 text-sm">No similar posts found.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else class="text-center py-12">
        <p class="text-xl text-gray-600">Post not found.</p>
        <NuxtLink to="/posts" class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Back to Posts
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, EyeIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/vue/24/outline';
import usePostStore from '~/stores/posts';

const route = useRoute();
const postStore = usePostStore();

const { posts, comments, currentPost, getPostLoading } = storeToRefs(postStore);
const hasMoreComments = computed(() => Number(comments.value?.length) > 3)
const showAllComments = ref(false);
const similarPosts = computed(() => posts.value?.filter(post => post.tags.some(tag => currentPost.value?.tags.includes(tag) && post.id !== currentPost.value.id)).slice(0, 3) || []);

onMounted(async () => {
  const postId = Number(route.params['postid']);

  // If post not found, fetch it
  if (!currentPost.value) {
    await postStore.fetchPostById(postId);
  }
});
</script>