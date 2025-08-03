// 顶部导航栏随滚动改变样式
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');
  const headerScrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > headerScrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  window.dispatchEvent(new Event('scroll'));
});

// 元素进入视口时添加动画类
document.addEventListener('DOMContentLoaded', () => {
  const observers = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  observers.forEach(el => observer.observe(el));
});

//菜单滑出图逻辑
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggleContainer");
  const menuToggleOverlay = document.getElementById("menuToggleOverlay");
  const menuSlideImage = document.getElementById("menuSlideImage");
  const navbar = menuSlideImage.querySelector(".navbar");
  const menuPage = menuSlideImage.querySelector("#menu-page"); // ✅ 新增

  // 打开滑出图
  menuToggle.addEventListener("click", function () {
    menuSlideImage.classList.add("active");
    navbar.classList.remove("navbar-reveal");
    menuPage.classList.add("active"); // ✅ 同时显示五个文本
    // 判断是否为手机端
const isMobile = window.innerWidth <= 768;

if (isMobile) {
  navbar.classList.add("navbar-reveal");
} else {
  setTimeout(() => {
    navbar.classList.add("navbar-reveal");
  }, 300);
}
  });

  // 关闭滑出图
  if (menuToggleOverlay) {
    menuToggleOverlay.addEventListener("click", function () {
      menuSlideImage.classList.remove("active");
      menuPage.classList.remove("active"); // ✅ 同时隐藏五个文本
    });
  }
});

// 图片画廊逻辑（拖动 + 自动吸附）
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".gallery-scroll-wrapper");
  const items = wrapper.querySelectorAll(".gallery-item");
  
  scrollToCenter(4); // 初始居中第五张

  function scrollToCenter(index) {
    const item = items[index];
    if (!item) return;
    const wrapperCenter = wrapper.offsetWidth / 2;
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const scrollPosition = itemCenter - wrapperCenter;
    wrapper.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }

  function triggerSnapScroll() {
    const scrollLeft = wrapper.scrollLeft;
    const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;
    const threshold = 60;

    if (scrollLeft < threshold) {
      wrapper.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (maxScrollLeft - scrollLeft < threshold) {
      wrapper.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      return;
    }

    const wrapperCenter = scrollLeft + wrapper.offsetWidth / 2;
    let closestItem = null;
    let closestDistance = Infinity;

    items.forEach(item => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(itemCenter - wrapperCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
      }
    });

    if (closestItem) {
      const itemCenter = closestItem.offsetLeft + closestItem.offsetWidth / 2;
      const scrollPosition = itemCenter - wrapper.offsetWidth / 2;
      wrapper.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }

  // 拖动相关变量
  const gallery = document.querySelector('.gallery-scroll-wrapper');
  const customCursor = document.querySelector('.custom-cursor');
  const cursorCore = customCursor?.querySelector('.cursor-core');
  const cursorArrows = customCursor?.querySelector('.cursor-arrows');

  let isDragging = false;
  let dragStartX = 0;
  let scrollStartLeft = 0;

  function updateCursorPosition(e) {
    if (!customCursor || !cursorArrows || !cursorCore) return;
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';

    const offset = isDragging ? 10 : 4;
    const direction = e.movementX > 0 ? 1 : -1;

    if (isDragging) {
      // 拖动时偏移小圆（cursorCore）
      cursorCore.style.transform = `translate(-50%, -50%) translateX(${direction * offset}px)`;
      cursorArrows.style.transform = `translate(-50%, -50%)`;
    } else {
      // 非拖动时偏移箭头
      cursorArrows.style.transform = `translate(-50%, -50%) translateX(${direction * offset}px)`;
      cursorCore.style.transform = `translate(-50%, -50%)`;
    }
}

  if (gallery) {
    gallery.addEventListener('mouseenter', () => {
      if (customCursor) customCursor.style.display = 'block';
    });

    gallery.addEventListener('mouseleave', () => {
      if (customCursor) customCursor.style.display = 'none';
    });

    gallery.addEventListener('mousedown', (event) => {
  if (event.button !== 0) return;
  isDragging = true;
  dragStartX = event.pageX;
  scrollStartLeft = gallery.scrollLeft;
  gallery.style.scrollBehavior = 'auto';

  if (customCursor) {
    customCursor.classList.add('small');
    const cursorCore = customCursor.querySelector('.cursor-core');
    const cursorArrows = customCursor.querySelector('.cursor-arrows');
    if (cursorCore) cursorCore.src = 'images/cursor-circle-small.png';
    if (cursorArrows) cursorArrows.src = 'images/cursor-arrows-small.png';
  }

  event.preventDefault();
});


    gallery.addEventListener('mousemove', (e) => {
      updateCursorPosition(e);
      if (!isDragging) return;
cursorCore.style.transform = `translate(-50%, -50%)`;
  cursorArrows.style.transform = `translate(-50%, -50%)`;
      const delta = e.pageX - dragStartX;
      gallery.scrollLeft = scrollStartLeft - delta;
    });

    document.addEventListener('mouseup', () => {
  if (!isDragging) return;
cursorCore.style.transform = `translate(-50%, -50%)`;
  cursorArrows.style.transform = `translate(-50%, -50%)`;
  isDragging = false;
  gallery.style.scrollBehavior = 'smooth';

  if (customCursor) {
    customCursor.classList.remove('small');
    const cursorCore = customCursor.querySelector('.cursor-core');
    const cursorArrows = customCursor.querySelector('.cursor-arrows');
    if (cursorCore) cursorCore.src = 'images/cursor-circle-large.png';
    if (cursorArrows) cursorArrows.src = 'images/cursor-arrows-large.png';
  }

  triggerSnapScroll();
});

  }
});
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const menuText = document.querySelector(".menu-text");
  const menuToggle = document.getElementById("menuToggleContainer");

  // 图片路径
  const blackIcon = "images/hamburger-icon-black.png";
  const grayIcon = "images/hamburger-icon-gray.png";
  const goldIcon = "images/hamburger-icon-gold.png";

  // 设置金色状态（hover）
  function setGold() {
    hamburgerIcon.src = goldIcon;
    menuText.style.color = "#C08C54";
  }

  // 设置普通状态（根据是否滚动）
  function setNormal() {
  const isHomePage = document.body.classList.contains("home-page");

  if (window.scrollY > 50) {
    hamburgerIcon.src = grayIcon;
    menuText.style.color = "#777";
  } else {
    if (isHomePage) {
      hamburgerIcon.src = "images/hamburger-icon-white.png";
      menuText.style.color = "#F7F7F7";
    } else {
      hamburgerIcon.src = blackIcon;
      menuText.style.color = "#000";
    }
  }
}

  // hover 联动触发
  menuToggle.addEventListener("mouseenter", setGold);
  menuToggle.addEventListener("mouseleave", setNormal);

  // 滚动时判断是否需要切换
  window.addEventListener("scroll", function () {
    if (!menuToggle.matches(":hover")) {
      setNormal();
    }
  });

  // 初始化执行
  setNormal();
});

// 给滑出菜单中的当前页面链接加上 .current-page
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".menu-links a");
  const currentPath = window.location.pathname.split("/").pop(); // 取最后部分 e.g. menu.html

  links.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("current-page");
    }
  });
});

