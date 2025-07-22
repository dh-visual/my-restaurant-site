
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

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.gallery-scroll-wrapper');
  if (!wrapper) return;

  // 🆕 插入这段：默认居中第五张图
  const items = wrapper.querySelectorAll('.gallery-item');
  if (items.length >= 5) {
    const middleItem = items[4];
    const itemOffsetLeft = middleItem.offsetLeft;
    const itemWidth = middleItem.offsetWidth;
    const wrapperWidth = wrapper.clientWidth;

    const newScrollLeft = itemOffsetLeft - (wrapperWidth - itemWidth) / 2;

    wrapper.scrollTo({
      left: newScrollLeft,
      behavior: 'auto'
    });
  }
  
  let isUserInteracting = false;
  let isScrolling;

  // 监听鼠标拖动开始（桌面）
  wrapper.addEventListener('mousedown', () => {
    isUserInteracting = true;
  });

  // 鼠标放开时触发对齐
  wrapper.addEventListener('mouseup', () => {
    isUserInteracting = false;
    triggerSnapToCenter();
  });

  // 监听触摸开始（移动设备）
  wrapper.addEventListener('touchstart', () => {
    isUserInteracting = true;
  });

  // 触摸结束时触发对齐
  wrapper.addEventListener('touchend', () => {
    isUserInteracting = false;
    triggerSnapToCenter();
  });

  // 防止用户松手前就触发吸附
  wrapper.addEventListener('scroll', () => {
    if (isUserInteracting) return;

    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      triggerSnapToCenter();
    }, 120);
  });

  function triggerSnapToCenter() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const centerX = wrapperRect.left + wrapperRect.width / 2;

    let closestItem = null;
    let closestDistance = Infinity;

    const items = wrapper.querySelectorAll('.gallery-item');

    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(centerX - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
      }
    });

    if (closestItem) {
      const scrollLeft = wrapper.scrollLeft;
      const itemOffsetLeft = closestItem.offsetLeft;
      const itemWidth = closestItem.offsetWidth;
      const wrapperWidth = wrapper.clientWidth;

      const newScrollLeft = itemOffsetLeft - (wrapperWidth - itemWidth) / 2;

      wrapper.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  }
});
// 页面加载完成后默认居中第5张图（从0开始编号，索引为4）
const wrapper = document.querySelector('.icon-marquee-track');  // ✅ 补上这一句
const items = wrapper.querySelectorAll('.marquee-icon');

if (items.length >= 5) {
  const middleItem = items[4];
  const itemOffsetLeft = middleItem.offsetLeft;
  const itemWidth = middleItem.offsetWidth;
  const wrapperWidth = wrapper.clientWidth;

  const newScrollLeft = itemOffsetLeft - (wrapperWidth - itemWidth) / 2;

  wrapper.scrollTo({
    left: newScrollLeft,
    behavior: 'auto'  // 不加动画，页面加载更自然
  });
}