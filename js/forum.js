document.addEventListener("DOMContentLoaded", () => {
    const forumPosts = [
        {
            id: 1,
            avatar: "https://i.pravatar.cc/150?img=11",
            handle: "@DrizzyDrake",
            verified: true,
            title: "How to add extended camera on SkyVision?",
            tag: "SkyVision",
            content: "I need to add extended camera to my SkyVision X7 i just bought, can someone tell me how? Because i have this new camera that i think will be great if i can just attach it to the back.",
            views: "1.3k",
            likes: "100",
            shares: "30"
        },
        {
            id: 2,
            avatar: "https://i.pravatar.cc/150?img=33",
            handle: "@A_Boogie",
            verified: true,
            title: "Which one's better, Recox or SkyVision?",
            tag: "General",
            content: "I know Recox and SkyVision have different use cases, but for the price, which one's actually better? I'm considering buying the Recox X2 Pro because of the design? note: I'm just a drone enthusiast.",
            views: "1.3k",
            likes: "100",
            shares: "30"
        },
        {
            id: 3,
            avatar: "https://i.pravatar.cc/150?img=53",
            handle: "@6GodOVO",
            verified: true,
            title: "Quick Tips and Tricks for SkyVision X7?",
            tag: "SkyVision",
            content: "Please guys, everytime you land SkyVision X7, always press the square button on its remote, it's useful for clearing out dusts on the landing area, minimizing landing damage accident.",
            views: "1.3k",
            likes: "100",
            shares: "30"
        },
        {
            id: 4,
            avatar: "https://i.pravatar.cc/150?img=12",
            handle: "@DroneMaster",
            verified: false,
            title: "Recox X2 Thermal Imaging not working?",
            tag: "Recox",
            content: "Has anyone experienced issues with the thermal scanner on the Recox X2 after the latest firmware update? It seems to be calibrating forever.",
            views: "850",
            likes: "42",
            shares: "12"
        },
        {
            id: 5,
            avatar: "https://i.pravatar.cc/150?img=8",
            handle: "@CinematicFlyer",
            verified: true,
            title: "Best ND Filters for SkyVision Pro",
            tag: "SkyVision",
            content: "Just got my Pro unit. Looking for recommendations on ND filters for bright daylight shooting in the mountains. Any brand preferences?",
            views: "2.1k",
            likes: "210",
            shares: "55"
        },
        {
            id: 6,
            avatar: "https://i.pravatar.cc/150?img=60",
            handle: "@SupportTeam",
            verified: true,
            title: "Firmware Update v2.4.1 Release Notes",
            tag: "Support",
            content: "We have released a new patch for all Recox series drones. This fixes the battery drainage issue reported in the forum last week. Please update via the JCI App.",
            views: "5k",
            likes: "400",
            shares: "120"
        },
         {
            id: 7,
            avatar: "https://i.pravatar.cc/150?img=68",
            handle: "@NewbiePilot",
            verified: false,
            title: "Is Recox X1 good for beginners?",
            tag: "Recox",
            content: "I've never flown a drone before but I need one for my farm security. Is the X1 too complicated or should I look at other models?",
            views: "300",
            likes: "10",
            shares: "2"
        }
    ];

    const POSTS_PER_PAGE = 6;
    let currentPage = 1;
    let currentFilter = 'All';

    const grid = document.getElementById('forumGrid');
    const topicSelect = document.getElementById('topicFilter');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageIndicator = document.getElementById('currentPage');

    function getTagClass(tag) {
        switch(tag.toLowerCase()) {
            case 'skyvision': return 'tag-skyvision';
            case 'recox': return 'tag-recox';
            case 'support': return 'tag-support';
            default: return 'tag-general';
        }
    }

    function renderPosts() {
        grid.innerHTML = '';

        const filteredPosts = forumPosts.filter(post => {
            if (currentFilter === 'All') return true;
            return post.tag === currentFilter;
        });

        const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
        
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
        if (totalPages === 0) currentPage = 1;

        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        const postsToDisplay = filteredPosts.slice(startIndex, endIndex);

        if (postsToDisplay.length === 0) {
            grid.innerHTML = '<p style="color:#888; grid-column: 1/-1; text-align:center;">No posts found for this topic.</p>';
        } else {
            postsToDisplay.forEach(post => {
                const card = document.createElement('div');
                card.className = 'post-card';
                card.innerHTML = `
                    <div class="post-header">
                        <img src="${post.avatar}" alt="User Avatar" class="avatar">
                        <div class="handle">
                            ${post.handle}
                            ${post.verified ? '<span class="material-symbols-outlined verified-icon">verified</span>' : ''}
                        </div>
                    </div>
                    
                    <div class="post-title">
                        ${post.title}
                        <span class="tag-badge ${getTagClass(post.tag)}">${post.tag}</span>
                    </div>

                    <p class="post-excerpt">${post.content}</p>

                    <div class="post-footer">
                        <div class="stat-item" title="Views">
                            <span class="material-symbols-outlined">visibility</span>
                            ${post.views}
                        </div>
                        
                        <button class="stat-item action-btn like-btn" data-id="${post.id}" onclick="handleLike(this)">
                            <span class="material-symbols-outlined">favorite</span>
                            <span class="count">${post.likes}</span>
                        </button>
                        
                        <button class="stat-item action-btn share-btn" data-id="${post.id}" onclick="handleShare(this)">
                            <span class="material-symbols-outlined">share</span>
                            <span class="count">${post.shares}</span>
                        </button>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        pageIndicator.innerText = `${currentPage}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
    }

    const dropdownContainer = document.getElementById('customTopicDropdown');
    const dropdownTrigger = document.getElementById('dropdownTrigger');
    const triggerText = document.getElementById('triggerText');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContainer.classList.toggle('open');
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const value = item.getAttribute('data-value');
            
            currentFilter = value;
            currentPage = 1;
            
            document.getElementById('selectedValue').textContent = value;
            
            dropdownItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            dropdownContainer.classList.remove('open');
            renderPosts();
            
            e.stopPropagation();
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target)) {
            dropdownContainer.classList.remove('open');
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });

    nextBtn.addEventListener('click', () => {
        const filteredCount = forumPosts.filter(p => currentFilter === 'All' ? true : p.tag === currentFilter).length;
        const maxPages = Math.ceil(filteredCount / POSTS_PER_PAGE);
        
        if (currentPage < maxPages) {
            currentPage++;
            renderPosts();
        }
    });

    renderPosts();
});

window.handleLike = function(btn) {
    event.stopPropagation();
    
    const countSpan = btn.querySelector('.count');
    let currentCount = parseInt(countSpan.innerText);
    
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
        countSpan.innerText = currentCount + 1;
    } else {
        countSpan.innerText = currentCount - 1;
    }
    
    console.log(`Liked post ${btn.dataset.id}`);
};

window.handleShare = function(btn) {
    event.stopPropagation();
    
    const countSpan = btn.querySelector('.count');
    let currentCount = parseInt(countSpan.innerText);
    
    alert("Link copied to clipboard!");
    countSpan.innerText = currentCount + 1;
    
    console.log(`Shared post ${btn.dataset.id}`);
};