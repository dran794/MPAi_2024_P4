export default {
  data() {
    return {
      isOpen: false,
      navItems: [
        {
          name: 'Vowel Playground',
          icon: 'mic',
          expanded: false,
          children: [
            { name: 'Playground Menu', href: '/menu' },
            { name: 'Model Speaker', href: '/model-speaker' },
            { name: 'Target', href: '/target' }
          ]
        },
        {
          name: 'Science of Speaking',
          icon: 'house',
          expanded: false,
          children: [
            { name: 'Intro', href: '/science-of-speaking' },
            { name: 'Test Playground', href: '/test-playground' }
          ]
        }
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    toggleDropdown(item) {
      item.expanded = !item.expanded;
    },
    navigateTo(href) {
      this.$router.push(href);
      this.isOpen = false;
    },
    handleOutsideClick(event) {
      if (this.isOpen && !this.$refs.sidebar.contains(event.target) && !this.$refs.toggleButton.contains(event.target)) {
        this.isOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  unmounted() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  template: `
    <div>
      <!-- Toggle Button -->
      <button ref="toggleButton" class="btn btn-outline-secondary position-fixed m-3 z-3" @click.stop="toggleSidebar">
        <i class="bi bi-list" style="font-size: 1.5rem;"></i>
      </button>

      <!-- Sidebar Drawer -->
      <transition name="slide">
        <div v-if="isOpen" ref="sidebar" class="position-fixed top-0 start-0 bg-light border-end shadow p-3" style="width: 250px; height: 100vh; z-index: 1000;">
          <h5 class="mb-4">Navigation</h5>
          <ul class="nav flex-column">
            <li v-for="item in navItems" :key="item.name" class="nav-item mb-2">
              <div class="d-flex justify-content-between align-items-center nav-link text-dark" @click="toggleDropdown(item)" style="cursor: pointer;">
                <span><i :class="'bi bi-' + item.icon + ' me-2'"></i>{{ item.name }}</span>
                <i :class="['bi', item.expanded ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
              </div>
              <ul v-show="item.expanded" class="nav flex-column ms-3 mt-1">
                <li v-for="child in item.children" :key="child.name">
                  <a href="#" class="nav-link text-dark" @click.prevent="navigateTo(child.href)">
                    {{ child.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  `
};
