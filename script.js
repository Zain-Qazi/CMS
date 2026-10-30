document.addEventListener("DOMContentLoaded", async () => {
    try {
        // 1. Fetch Common Company Info
        const compRes = await fetch('company.json');
        const company = await compRes.json();
        
        const brandEls = document.querySelectorAll('#brand-name');
        brandEls.forEach(el => el.innerText = company.business_name);

        // Contact info bindings if present
        if(document.getElementById('contact-phone')) document.getElementById('contact-phone').innerText = company.phone;
        if(document.getElementById('contact-email')) document.getElementById('contact-email').innerText = company.email;
        if(document.getElementById('contact-address')) document.getElementById('contact-address').innerText = `${company.address}, ${company.country}`;

        // 2. Fetch Pages Content
        const pagesRes = await fetch('pages-content.json');
        const content = await pagesRes.json();

        const pageId = document.body.getAttribute('data-page');

        if (pageId && content[pageId]) {
            const pageData = content[pageId];
            
            // Set SEO Meta tags dynamically
            if(document.getElementById('meta-title')) {
                document.getElementById('meta-title').innerText = pageData.meta_title;
            }
            if(document.getElementById('meta-desc')) {
                document.getElementById('meta-desc').setAttribute('content', pageData.meta_desc);
            }

            // Page specific bindings
            if (pageId === 'home') {
                document.getElementById('hero-title').innerText = pageData.hero_title;
                document.getElementById('hero-subtitle').innerText = pageData.hero_subtitle;
                document.getElementById('cta-btn').innerText = pageData.cta_text;
                document.getElementById('services-heading').innerText = pageData.services_heading;

                // Load Products/Services from data.json
                const dataRes = await fetch('data.json');
                const data = await dataRes.json();
                const grid = document.getElementById('services-grid');
                grid.innerHTML = '';

                data.services.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'service-card';
                    card.innerHTML = `
                        <img src="${item.product_img && item.product_img !== "Here would be the image url" ? item.product_img : 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600'}" alt="${item.title}" class="service-img">
                        <div class="service-info">
                            <h3>${item.title}</h3>
                            <div class="service-price">Rs. ${item.price}</div>
                            <p>${item.description}</p>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            } 
            else if (pageId === 'about') {
                document.getElementById('about-heading').innerText = pageData.heading;
                document.getElementById('about-body').innerText = pageData.body;
            } 
            else if (pageId === 'contact') {
                document.getElementById('contact-heading').innerText = pageData.heading;
                document.getElementById('contact-subheading').innerText = pageData.subheading;
            } 
            else if (pageId === 'privacy') {
                document.getElementById('privacy-heading').innerText = pageData.heading;
                document.getElementById('privacy-date').innerText = pageData.last_updated;
                document.getElementById('privacy-body').innerText = pageData.body;
            }
        }

    } catch (err) {
        console.error("Error loading site content:", err);
    }
});