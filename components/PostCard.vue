<template>
  <div class="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white hover:bg-gray-50">
    <div class="p-4">
      <h2 class="text-xl font-bold mb-2 truncate">{{ post.title }}</h2>
      <p class="text-gray-600 mb-4 line-clamp-4">{{ post.body }}</p>
      
      <div class="flex flex-wrap gap-2 mb-3 mt-20">
        <span 
          v-for="tag in post.tags" 
          :key="tag" 
          class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
        >
          #{{ tag }}
        </span>
      </div>
      
      <div class="flex justify-between items-center text-sm text-gray-500">
        <div class="flex items-center space-x-4">
          <span class="flex items-center">
            <HandThumbUpIcon class="w-4 h-4 mr-1" />
            {{ post.reactions.likes }}
          </span>
          <span class="flex items-center">
            <HandThumbDownIcon class="w-4 h-4 mr-1" />
            {{ post.reactions.dislikes }}
          </span>
        </div>
        <span class="flex items-center">
          <EyeIcon class="h-4 w-4 mr-1" />
          {{ post.views }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types';
import { HandThumbDownIcon, HandThumbUpIcon, EyeIcon } from '@heroicons/vue/24/outline';

defineProps({
    post: {
        type: Object as PropType<Post>,
        required: true
    }
})
</script>
