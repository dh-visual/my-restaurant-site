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
    if (!customCursor || !cursorArrows) return;
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';

    const offset = isDragging ? 10 : 4;
    const direction = e.movementX > 0 ? 1 : -1;
    cursorArrows.style.transform = `translate(-50%, -50%) translateX(${direction * offset}px)`;
  }

  if (gallery) {
    gallery.addEventListener('mouseenter', () => {
      if (customCursor) customCursor.style.display = 'block';
    });

    gallery.addEventListener('mouseleave', () => {
      if (customCursor) customCursor.style.display = 'none';
    });

    gallery.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return; // 只响应左键
      isDragging = true;
      dragStartX = event.pageX;
      scrollStartLeft = gallery.scrollLeft;
      gallery.style.scrollBehavior = 'auto';  // ✅ 拖动时取消平滑滚动
      if (customCursor) customCursor.classList.add('small');
      event.preventDefault();
    });

    gallery.addEventListener('mousemove', (e) => {
      updateCursorPosition(e);
      if (!isDragging) return;
      const delta = e.pageX - dragStartX;
      gallery.scrollLeft = scrollStartLeft - delta;
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      gallery.style.scrollBehavior = 'smooth';  // ✅ 拖动结束恢复平滑吸附
      if (customCursor) customCursor.classList.remove('small');
      triggerSnapScroll();
    });
  }
});
