document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("sparkle-container");
    const isMobile = window.innerWidth < 768;

    // Mảng các câu nói
    const messages = [
        "21/08",
        "chúc người a yêu  tuổi mới luôn vui vẻ",
        "lạc quan yêu đời",
        "mong e sẽ thành công những gì e mơ ước",
        " khoảng thời gian đó a sẽ luôn đồng hành cùng e",
        " mong cho tuổi mới e sẽ yêu a nhiều hơn nè",
        " Mình yêu xa a biết e mệt mỏi và lúc nào cũng lo lắng",
        "nhưng e yên tâm lúc nào a cũng ở đây lắng nghe trò chuyện cùng e",
        "A yêu e nhiều lắm",
        " Chúc e có 1 ngày sinh nhật thật vui vẻ",
    ];

    // Tạo gradient màu ngẫu nhiên
    function getRandomGradient() {
        const pinkShades = [
            "#ff69b4", // Hot Pink
            "#ff1493", // Deep Pink
            "#ffb6c1", // Light Pink
            "#ffc0cb", // Pink
            "#db7093", // Pale Violet Red
            "#ff69b4", // Hot Pink
            "#ff1493", // Deep Pink
        ];

        const whiteShades = [
            "#ffffff", // White
            "#f8f8f8", // Off White
            "#f0f0f0", // Light Gray
            "#e8e8e8", // Light Gray
            "#f5f5f5", // White Smoke
        ];

        const pink = pinkShades[Math.floor(Math.random() * pinkShades.length)];
        const white =
            whiteShades[Math.floor(Math.random() * whiteShades.length)];
        const angle = Math.floor(Math.random() * 360);

        return `linear-gradient(${angle}deg, ${pink}, ${white})`;
    }

    // Tạo cánh hoa
    function createPetal(x, y) {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        petal.style.left = `${x}px`;
        petal.style.top = `${y}px`;

        // Tạo hướng rơi ngẫu nhiên
        const fallX = (Math.random() - 0.5) * 200; // -100px đến 100px
        const fallY = Math.random() * 200 + 100; // 100px đến 300px
        petal.style.setProperty("--fall-x", `${fallX}px`);
        petal.style.setProperty("--fall-y", `${fallY}px`);

        document.body.appendChild(petal);

        // Xóa cánh hoa sau khi animation kết thúc
        setTimeout(() => {
            if (document.body.contains(petal)) {
                document.body.removeChild(petal);
            }
        }, 3000);
    }

    // Hàm tạo text và cánh hoa
    function createTextAndPetals(x, y) {

        const randomMessage =
            messages[Math.floor(Math.random() * messages.length)];
        const text = document.createElement("div");
        text.classList.add("click-text");
        text.textContent = randomMessage;
        text.style.setProperty("--gradient-color", getRandomGradient());

        // Đặt vị trí text
        text.style.left = `${x}px`;
        text.style.top = `${y}px`;

        document.body.appendChild(text);

        // Tạo nhiều cánh hoa xung quanh vị trí
        for (let i = 0; i < 8; i++) {
            const offsetX = (Math.random() - 0.5) * 50;
            const offsetY = (Math.random() - 0.5) * 50;
            createPetal(x + offsetX, y + offsetY);
        }

        // Xóa text sau khi animation kết thúc
        setTimeout(() => {
            if (document.body.contains(text)) {
                document.body.removeChild(text);
            }
        }, 8000);
    }

    // Xử lý sự kiện click
    document.addEventListener("click", (event) => {
        createTextAndPetals(event.clientX, event.clientY);
    });

    // Tự động tạo text sau mỗi khoảng thời gian
    function createAutoText() {
        const x = Math.random() * (window.innerWidth - 200) + 100;
        const y = Math.random() * (window.innerHeight - 200) + 100;
        createTextAndPetals(x, y);
    }

    // Tạo text tự động mỗi 3 giây
    setInterval(createAutoText, 3000);

    // Mảng các link ảnh
    let currentImageIndex = 0;
    const imageUrls = Array.from({ length: 15 }, (_, i) => `a${i + 1}.jpg`);

    function getNextImageUrl() {
        const url = imageUrls[currentImageIndex];
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        return url;
    }

    function createFallingImage() {
        const image = document.createElement("img");
        image.src = getNextImageUrl();
        image.classList.add("falling-image");

        const maxLeft = window.innerWidth - window.innerWidth * 0.6;
        const randomLeft = Math.random() * maxLeft;
        image.style.left = `${randomLeft}px`;
        image.style.top = "-260px";

        const duration = Math.random() * 3 + 4;
        const distance = window.innerHeight + 260;

        image.style.animation = `fall ${duration}s linear forwards`;
        image.style.setProperty("--fall-distance", `${distance}px`);

        container.appendChild(image);

        setTimeout(() => {
            if (container.contains(image)) {
                container.removeChild(image);
            }
        }, duration * 1000);
    }

    // Tạo hiệu ứng rơi trái tim
    function createFallingHeart() {
        const heart = document.createElement("div");
        heart.classList.add("falling-heart");
        heart.textContent = "❤";

        // Tạo vị trí ngẫu nhiên trên toàn bộ chiều rộng màn hình
        const maxLeft = window.innerWidth - 50; // Trừ đi chiều rộng của trái tim
        const randomLeft = Math.random() * maxLeft;
        heart.style.left = `${randomLeft}px`;
        heart.style.top = "-50px";

        // Tạo animation rơi
        const duration = Math.random() * 2 + 3; // 1-3 giây
        const distance = window.innerHeight + 50;

        heart.style.animation = `fall ${duration}s linear forwards`;
        heart.style.setProperty("--fall-distance", `${distance}px`);

        container.appendChild(heart);

        // Xóa trái tim sau khi animation kết thúc
        setTimeout(() => {
            if (container.contains(heart)) {
                container.removeChild(heart);
            }
        }, duration * 1000);
    }

    // Tạo ảnh rơi mỗi 2-3 giây
    setInterval(createFallingImage, Math.random() * 1000 + 2000);

    // Tạo trái tim rơi mỗi 0.5-1 giây
    setInterval(createFallingHeart, Math.random() * 500 + 500);

    // Nền sao
    function createSparkle() {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.style.top = Math.random() * 100 + "%";
        sparkle.style.left = Math.random() * 100 + "%";
        container.appendChild(sparkle);
    }

    for (let i = 0; i < (isMobile ? 50 : 100); i++) {
        createSparkle();
    }

    // Sao băng
    function createShootingStar() {
        const star = document.createElement("div");
        star.classList.add("shooting-star");

        const tailLength = Math.random() * 100 + 100;
        const durationSec = Math.random() * 2 + 3;
        star.style.setProperty("--shooting-star-length", `${tailLength}px`);
        star.style.setProperty("--shooting-star-duration", `${durationSec}s`);

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const startX = Math.random() * screenWidth;
        const startY = Math.random() * (screenHeight * 0.3);
        const angle = 45 + Math.random() * 20;

        const distance = screenHeight * 1.2;
        const endX = startX + distance * Math.cos((angle * Math.PI) / 180);
        const endY = startY + distance * Math.sin((angle * Math.PI) / 180);

        star.style.setProperty("--start-x", `${startX}px`);
        star.style.setProperty("--start-y", `${startY}px`);
        star.style.setProperty("--end-x", `${endX}px`);
        star.style.setProperty("--end-y", `${endY}px`);
        star.style.setProperty("--angle", `${angle}deg`);

        container.appendChild(star);
        setTimeout(() => {
            if (container.contains(star)) container.removeChild(star);
        }, durationSec * 1000 + 100);
    }

    setInterval(createShootingStar, isMobile ? 1500 : 2000);
});
