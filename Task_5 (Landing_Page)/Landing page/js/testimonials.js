const reviews = [
    { name: "Sarah Khan", role: "Product Manager", text: "CloudSync has completely transformed how our remote team works." },
    { name: "Ahmed Ali", role: "CTO", text: "Simple enough for beginners, powerful enough for experts." },
    { name: "Jessica Cheng", role: "Designer", text: "The UI is stunning and the dark mode is a lifesaver for late nights." },
    { name: "David Miller", role: "Freelancer", text: "Best investment I've made for my business this year." },
    { name: "Emily Johnson", role: "Marketing Director", text: "Analytics features are robust and easy to understand." },
    { name: "Michael Brown", role: "Developer", text: "API integration was seamless. Great documentation." },
    { name: "Olivia Davis", role: "Content Creator", text: "Uploading and sharing large files is faster than ever." },
    { name: "Daniel Wilson", role: "Startup Founder", text: "Helped us scale from 5 to 50 employees without a hitch." },
    { name: "Sophia Martinez", role: "Project Manager", text: "Task tracking is intuitive and keeps everyone on the same page." },
    { name: "James Anderson", role: "Sales Lead", text: "Customer support is top-notch. Solved my issue in minutes." },
    { name: "Isabella Thomas", role: "HR Manager", text: "Onboarding new team members is a breeze with CloudSync." },
    { name: "William Jackson", role: "Educator", text: "Perfect for managing student projects and assignments." },
    { name: "Mia White", role: "Photographer", text: "The gallery view for files is beautiful." },
    { name: "Benjamin Harris", role: "Consultant", text: "Security features give me peace of mind with client data." },
    { name: "Charlotte Martin", role: "Event Planner", text: "Keeps all my vendor contracts and schedules organized." },
    { name: "Lucas Thompson", role: "Architect", text: "Sharing blueprints and specific feedback is so easy." },
    { name: "Amelia Garcia", role: "Non-profit Director", text: "The discount for non-profits was a huge help for us." },
    { name: "Mason Robinson", role: "Video Editor", text: "Fastest upload speeds I've seen on any platform." },
    { name: "Harper Clark", role: "Blogger", text: "I run my entire blog workflow through CloudSync." },
    { name: "Ethan Rodriguez", role: "Student", text: "Great for group projects. Real-time editing is smooth." },
    { name: "Evelyn Lewis", role: "Researcher", text: "Data organization tools are excellent for my papers." },
    { name: "Alexander Lee", role: "Game Developer", text: "Version control for assets is a game changer." },
    { name: "Abigail Walker", role: "Accountant", text: "Securely sharing financial docs has never been easier." },
    { name: "Henry Hall", role: "Ops Manager", text: "Reduced our internal email traffic by 50%." },
    { name: "Ella Allen", role: "Social Media Manager", text: "Calendar view helps me plan content weeks ahead." },
    { name: "Sebastian Young", role: "Real Estate Agent", text: "I can access all my property files on the go." },
    { name: "Sofia Hernandez", role: "Chef", text: "I store all my recipes and menu plans here. Love it!" },
    { name: "Jack King", role: "Musician", text: "Sharing demos with my bandmates is super quick." },
    { name: "Avery Wright", role: "Journalist", text: "Keeps my sources and notes secure and organized." },
    { name: "Liam Scott", role: "Coach", text: "Tracking athlete progress is simple and effective." },
    { name: "Scarlett Green", role: "Interior Designer", text: "Mood boards look great in the file preview." },
    { name: "Wyatt Adams", role: "Logistics Coordinator", text: "Inventory tracking templates are very useful." },
    { name: "Madison Baker", role: "Retail Owner", text: "Helps me track sales and inventory across locations." },
    { name: "Carter Nelson", role: "Fitness Trainer", text: "My clients love the progress tracking features." },
    { name: "Layla Carter", role: "Legal Aide", text: "Search functionality is incredibly fast and accurate." },
    { name: "Jayden Mitchell", role: "Barista", text: "We use it for shift scheduling. Works perfectly." },
    { name: "Chloe Perez", role: "Travel Agent", text: "Storing client itineraries and docs is safe and easy." },
    { name: "Gabriel Roberts", role: "Pilot", text: "Accessing manuals offline is a great feature." },
    { name: "Zoey Turner", role: "Veterinarian", text: "Patient records are secure and easy to update." },
    { name: "Julian Phillips", role: "Electrician", text: "I can pull up schematics right on the job site." },
    { name: "Penelope Campbell", role: "Florist", text: "Organizing wedding orders has never been simpler." },
    { name: "Mateo Parker", role: "Mechanic", text: "Parts inventory is always up to date now." },
    { name: "Riley Evans", role: "Writer", text: "Distraction-free mode helps me focus on drafting." },
    { name: "David Edwards", role: "Chef", text: "Menu collaboration with my sous chefs is improved." },
    { name: "Victoria Collins", role: "Recruiter", text: "Managing candidate resumes is efficient." },
    { name: "Samuel Stewart", role: "Analyst", text: "Generating reports takes seconds instead of hours." },
    { name: "Grace Sanchez", role: "Artist", text: "High-res image support is fantastic for my portfolio." },
    { name: "Joseph Morris", role: "Plumber", text: "Invoicing clients directly from the app is handy." },
    { name: "Natalie Rogers", role: "Baker", text: "Recipe scaling tools are a nice bonus." },
    { name: "Lincoln Reed", role: "Driver", text: "Route planning integration saves me time." },
    { name: "Hannah Cook", role: "Nurse", text: "Shift swaps are easy to manage now." },
    { name: "Ryan Morgan", role: "Carpenter", text: "Project timelines help keep me on schedule." }
];

const testimonialsContainer = document.getElementById('testimonials-container');

function createReviewCard(review) {
    return `
        <div class="flex-shrink-0 w-80 p-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 mx-4">
            <div class="flex gap-1 text-yellow-400 mb-4 text-sm">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p class="text-slate-700 dark:text-slate-300 italic mb-6 line-clamp-3">"${review.text}"</p>
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
                    ${review.name.charAt(0)}
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white text-sm">${review.name}</h4>
                    <p class="text-xs text-slate-500">${review.role}</p>
                </div>
            </div>
        </div>
    `;
}

function renderTestimonials() {
    // Split reviews into two rows for visual interest
    const firstRowContent = reviews.slice(0, 25).map(createReviewCard).join('');
    const secondRowContent = reviews.slice(25).map(createReviewCard).join('');

    testimonialsContainer.innerHTML = `
        <div class="relative w-full overflow-hidden py-10">
            <!-- First Row (Left to Right) -->
            <div class="flex animate-marquee hover:pause-animation">
                ${firstRowContent}
                ${firstRowContent} <!-- Duplicate for seamless loop -->
            </div>
            
            <!-- Second Row (Right to Left) -->
            <div class="flex animate-marquee-reverse hover:pause-animation mt-8">
                ${secondRowContent}
                ${secondRowContent} <!-- Duplicate for seamless loop -->
            </div>
            
            <!-- Fade Edges -->
            <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        </div>
    `;
}

if (testimonialsContainer) {
    renderTestimonials();
}
