<template>
  <div class="flex h-screen">
    <aside
      class="w-56 flex-shrink-5"
      :class="[{ 'bg-black': isSidebarOpen, 'text-gray-50': isSidebarOpen }]"
    >
      <ul>
        <div>
          <li>
            <button @click="toggleSidebar()" class="toggle-button">
              <span v-if="isSidebarOpen" class="researcher-text white-text">rese</span>
              <span v-if="isSidebarOpen" class="researcher-text orange-text">archer.</span>
            </button>
          </li>
        </div>
        <div v-show="isSidebarOpen" :class="[{ 'bg-black': isSidebarOpen,'text-gray-50': isSidebarOpen }]">
          <li><router-link to="/home" class="sidebar-link"><span style="margin-bottom: 4px;">🏠&nbsp;&nbsp;</span>Home Page</router-link></li>
          <li><router-link to="/about" class="sidebar-link"><span style= "margin-left: 4px;">ⓘ&nbsp;&nbsp;&nbsp;</span>About Us</router-link></li>
          <li><router-link to="/contact" class="sidebar-link"><span style="margin-bottom: 4px;">💬&nbsp;&nbsp;</span>Contact Us</router-link></li>
          <li><router-link to="/table" class="sidebar-link"><span style="margin-bottom: 4px;">▄█&nbsp;&nbsp;&nbsp;</span>Analytics</router-link></li>
          <li><router-link to="/settings" class="sidebar-link"><span style="margin-bottom: 4px;">⚙️&nbsp;&nbsp;&nbsp;</span>Settings</router-link></li>
        </div>
      </ul>
    </aside>
    <div v-if="!isSidebarOpen" class="collapsed-background">
      <ul>
        <li><button class="arrow self-center text-center" style="z-index: 1;" @click="toggleSidebar">&raquo;</button></li>
        <li><router-link to="/home" class="sidebar-link"><span style="margin-left: 4px;">🏠&nbsp;&nbsp;</span></router-link></li>
        <li><router-link to="/about" class="sidebar-link"><span style="margin-left: 8px;">ⓘ&nbsp;&nbsp;</span></router-link></li>
        <li><router-link to="/contact" class="sidebar-link"><span style="margin-left: 4px;">💬&nbsp;&nbsp;</span></router-link></li>
        <li><router-link to="/table" class="sidebar-link"><span style="margin-left: 2.5px;">▄█&nbsp;&nbsp;</span></router-link></li>
        <li><router-link to="/settings" class="sidebar-link"><span style="margin-left: 3.5px;">⚙️&nbsp;&nbsp;</span></router-link></li>
      </ul>
    </div>
    <main class="flex-1 bg-gray-1 p-8">
      <div class="mx-auto">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
.toggle-button {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.researcher-text {
  font-family: 'Arial', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: baseline;
}

.white-text {
  color: #ffffff; 
}

.black-text {
  color: #000000; 
}

.orange-text {
  color: #ff9900; 
}

.arrow {
  margin-left: 15.5px;
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  color: #43ed21;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.sidebar-link span {
  margin-right: 0.3rem; 
  font-size: 1.2rem; 
  color: #ffffff; 
}

.sidebar-link:hover {
  color: #dfee0c;
  box-shadow: 0 0 10px rgba(253, 238, 12, 0.8);
}

.collapsed-background {
  width: 52px;
  height: 100%;
  background-color: #000000;
  position: fixed;
  left: 0px; 
  top: 0;
  z-index: 0;
  transition: width 0.3s ease, opacity 0.3s ease; 
}
</style>

<script>
export default {
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
