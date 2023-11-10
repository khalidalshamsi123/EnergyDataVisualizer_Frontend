<template>
    <div class="flex h-screen">

  
      <!-- Collapsible Sidebar -->
      <aside
        class="w-64 flex-shrink-5"
        :class="[{ 'bg-gray-600': isSidebarOpen, 'text-gray-50': isSidebarOpen }]"
      >
        <!-- Your sidebar content -->
        <ul>
          <div>
            <li><button @click=toggleSidebar()>Navigation bar</button></li>
          </div>
          <div v-show="isSidebarOpen" 
          :class="[{ 'bg-gray-600': isSidebarOpen, 'text-gray-50': isSidebarOpen }]">
                <li><router-link to="/home">Home Page</router-link></li>
                <li><router-link to="/about">About Us</router-link></li>
                <li><router-link to="/contact">Contact Us</router-link></li>
          </div>
        </ul>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 bg-gray-1 p-8">
        <div class="mx-auto">
          <slot></slot>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isSidebarOpen: true // Initial state of the sidebar
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      }
    }
  };
  </script>
 