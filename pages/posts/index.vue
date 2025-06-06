<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Blog Posts</h1>
    
    <!-- Loading State -->
    <div v-if="postStore.getLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    
    <!-- Posts Grid -->
    <div v-else-if="postStore.getPosts && postStore.getPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="post in postStore.getPosts" :key="post.id" class="flex">
        <div @click="() => { postStore.setCurrentPost(post); navigateTo(`/posts/${post.id}`) }" class="w-full cursor-pointer">
          <PostCard :post="post" />
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-xl text-gray-600">No posts found.</p>
    </div>
    
    <!-- Pagination -->
    <div v-if="postStore.getTotalPages > 0" class="mt-12 flex justify-center">
      <div class="flex items-center space-x-1">
        <!-- Previous Button -->
        <button 
          @click="postStore.prevPage()" 
          :disabled="postStore.getCurrentPage === 1"
          class="px-4 py-2 border rounded-md transition-colors duration-300"
          :class="postStore.getCurrentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-300 hover:bg-blue-50'"
        >
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="h-5 w-5" />
        </button>
        
        <!-- Page Numbers -->
        <template v-for="page in paginationRange" :key="page">
          <button 
            v-if="page !== '...'"
            @click="postStore.goToPage(Number(page))"
            class="px-4 py-2 border rounded-md transition-colors duration-300"
            :class="postStore.getCurrentPage === Number(page) ? 'bg-blue-600 text-white border-blue-600' : 'text-blue-600 border-blue-300 hover:bg-blue-50'"
          >
            {{ page }}
          </button>
          <span v-else class="px-3 py-2 text-gray-500">...</span>
        </template>
        
        <!-- Next Button -->
        <button 
          @click="postStore.nextPage()" 
          :disabled="postStore.getCurrentPage === postStore.getTotalPages"
          class="px-4 py-2 border rounded-md transition-colors duration-300"
          :class="postStore.getCurrentPage === postStore.getTotalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-300 hover:bg-blue-50'"
        >
          <ChevronRightIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePostStore from '~/stores/posts';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';

const postStore = usePostStore();

onMounted(() => {
  postStore.fetchPosts();
});

// Create pagination range with ellipsis for large page counts
const paginationRange = computed(() => {
  const totalPages = postStore.getTotalPages;
  const currentPage = postStore.getCurrentPage;
  
  // If we have 7 or fewer pages, show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  // Always include first and last page
  const firstPage = 1;
  const lastPage = totalPages;
  
  // Calculate the range of pages to show around the current page
  let startPage = Math.max(2, currentPage - 1);
  let endPage = Math.min(totalPages - 1, currentPage + 1);
  
  // Adjust the range if we're near the beginning or end
  if (currentPage <= 3) {
    endPage = 4;
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 3;
  }
  
  // Build the range array
  const range = [];
  range.push(firstPage);
  
  // Add ellipsis if needed before the range
  if (startPage > 2) {
    range.push('...');
  }
  
  // Add the range of pages
  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }
  
  // Add ellipsis if needed after the range
  if (endPage < totalPages - 1) {
    range.push('...');
  }
  
  // Add the last page if it's not already included
  if (lastPage !== endPage) {
    range.push(lastPage);
  }
  
  return range;
});
</script>