"""
Seeds comprehensive imaginary college data for Shree Kandhaswamy Arts & Science College (SKASC)
into the database to feed the Gemini LLM knowledge base.
"""
from .models import CollegeInfo, Department, Notice

def seed_all_data():
    print("Seeding SKASC College Information knowledge base...")

    college_knowledge = [
        {
            "category": "general",
            "title": "About SKASC (Shree Kandhaswamy Arts & Science College)",
            "content": """Shree Kandhaswamy Arts & Science College (SKASC) is an autonomous, premier institution established in 1999, celebrating 25+ years of academic excellence.
Accredited with 'A+' Grade by NAAC and affiliated with Bharathiar University, SKASC is located in Coimbatore, Tamil Nadu.
Motto: 'Learn • Innovate • Excel'.
Vision: Empowering young minds with quality education, modern infrastructure, moral integrity, and holistic student development.
Campus: 35-acre lush green eco-friendly campus featuring state-of-the-art smart classrooms, world-class research laboratories, and advanced computing centers.
Current enrollment: Over 5,000+ happy students across undergraduate and postgraduate programmes with 250+ dedicated faculty members."""
        },
        {
            "category": "admissions",
            "title": "Admissions 2026-2027 Guidelines & Eligibility",
            "content": """SKASC Admissions for the academic year 2026-2027 are currently open!
- Under Graduate (UG) Programs: Candidates must have passed Higher Secondary (10+2) or equivalent from a recognized board with minimum 50% aggregate (45% for reserved categories). For BCA/B.Sc CS, Mathematics or Computer Science at 10+2 level is preferred.
- Post Graduate (PG) Programs: Recognized Bachelor's degree (10+2+3 pattern) in relevant discipline with minimum 50% marks.
- How to Apply:
  1. Visit the Admissions page on the SKASC portal (or visit the on-campus Admission Helpdesk).
  2. Fill in student profile, academic marks, and course preferences.
  3. Upload photo, 10th and 12th mark sheets, and transfer certificate.
  4. Pay nominal application fee of ₹300 online.
  5. Shortlisted candidates are invited for verification and counseling.
- Important Dates:
  * Application Start Date: April 10, 2026
  * Phase 1 Counseling: May 25, 2026
  * Academic Session Commencement: July 01, 2026."""
        },
        {
            "category": "fees",
            "title": "Fee Structure & Scholarships 2026-2027",
            "content": """SKASC offers affordable, transparent fee structures with generous merit scholarships:
- Undergraduate Tuition Fees (per semester):
  * BCA (Bachelor of Computer Applications): ₹36,000 / semester
  * B.Sc Computer Science / AI & Data Science: ₹38,000 / semester
  * B.Sc Physics / Chemistry / Biotechnology: ₹30,000 / semester
  * B.Sc Mathematics: ₹26,000 / semester
  * B.Com (General / CA / Professional Accounting): ₹32,000 / semester
  * B.A. English Literature / Economics: ₹22,000 / semester
- Postgraduate Tuition Fees (per semester):
  * MCA (Master of Computer Applications): ₹45,000 / semester
  * M.Sc Mathematics / Biotechnology: ₹35,000 / semester
  * M.Com / M.A. English: ₹28,000 / semester
- Scholarships:
  * Founder's Merit Scholarship: 100% tuition waiver for Board exam toppers (>95% score).
  * Academic Excellence Scholarship: 50% tuition concession for students with >85% score.
  * Sports Quota Scholarship: Free hostel and up to 100% fee concession for national/state level players.
  * Government welfare scholarships for SC/ST/OBC/First Graduate students."""
        },
        {
            "category": "courses",
            "title": "Degree Programs & Course Curriculum",
            "content": """SKASC offers Choice Based Credit System (CBCS) with industry-integrated curriculum:
- Department of Computer Applications:
  * BCA (3 Years) - Cloud Computing, Web Technologies, Python, Mobile App Development.
  * B.Sc Artificial Intelligence & Machine Learning (3 Years).
  * MCA (2 Years) - AI/ML, Full-stack Engineering, DevOps, Cloud Architecture.
- Department of Science:
  * B.Sc Biotechnology, B.Sc Microbiology, B.Sc Physics, B.Sc Chemistry.
- Department of Mathematics:
  * B.Sc Mathematics with Data Analytics, M.Sc Mathematics.
- Department of Commerce:
  * B.Com General, B.Com Computer Applications, B.Com Professional Accounting, B.Com Banking & Insurance, M.Com.
- Department of Arts & Humanities:
  * B.A. English Literature, B.A. Economics, M.A. English.
- Value Added Certificate Courses: AWS Cloud Practitioner, Google Cloud Computing, Cyber Security, Digital Marketing, FinTech, and Data Visualization with PowerBI."""
        },
        {
            "category": "departments",
            "title": "Department Profiles & HODs",
            "content": """Academic Departments at SKASC:
1. Department of Computer Applications: HOD - Dr. R. Soundararajan, Ph.D. Features 6 state-of-the-art computer labs, NVIDIA GPU computing workstation, and Apple Mac Lab.
2. Department of Science: HOD - Dr. M. Jayanthi, Ph.D. Equipped with advanced spectrophotometers, laminar airflows, and biotechnology incubators.
3. Department of Mathematics: HOD - Dr. K. Srinivasan, Ph.D. Focuses on statistical modeling, numerical simulations, and applied algebra.
4. Department of Commerce: HOD - Dr. S. Balasubramanian, Ph.D., M.Phil. Features a live Tally & GST simulation lab and Commerce Research Centre.
5. Department of Arts & Humanities: HOD - Dr. P. Anuradha, Ph.D. Features Digital Language Lab with Cambridge English training facilities."""
        },
        {
            "category": "facilities",
            "title": "Campus Facilities & Infrastructure",
            "content": """SKASC provides world-class campus facilities:
- Digital Central Library: Spanning 15,000 sq.ft, holding 45,000+ print volumes, 12,000+ e-books, subscriptions to IEEE, Springer, and DELNET, plus a 100-seat digital browsing lab.
- High Performance Computing Labs: 8 air-conditioned computer labs with 650+ high-end desktop workstations, Gigabit LAN, and dedicated 500 Mbps high-speed internet.
- Smart Classrooms: Interactive digital touch boards, high-definition projectors, and hybrid lecture recording facilities in all lecture halls.
- Auditorium & Seminar Halls: Air-conditioned 'Kandhaswamy Auditorium' with 2,000 seating capacity, plus 3 departmental seminar halls with surround sound.
- Sports & Athletics: International standard 400m track, football field, cricket pitch, synthetic basketball & volleyball courts, and indoor sports arena.
- Modern Gym: Well-equipped gymnasium for boys and girls with certified physical fitness trainers.
- Cafeteria & Food Court: Clean, hygienic multi-cuisine food court serving South Indian, North Indian, fresh juices, and baked snacks at subsidized rates."""
        },
        {
            "category": "hostel",
            "title": "Hostel Accommodation & Dining",
            "content": """Residential Life at SKASC:
- Separate modern hostels for Boys and Girls situated inside the campus perimeter.
- Room Options: 2-sharing, 3-sharing, and 4-sharing rooms with attached/common bath options and air-cooling.
- Amenities: 24/7 high-speed Wi-Fi, study tables, personal wardrobes, solar hot water, laundry facility, and water purification RO plant.
- Dining: Pure vegetarian and non-vegetarian messes serving hygienic, wholesome meals designed by nutritionists.
- Security: 24/7 CCTV surveillance, biometric access control, and resident wardens.
- Healthcare: 24/7 medical room with an on-duty nurse, resident doctor visits, and tie-up with local multi-specialty hospital with ambulance service on campus.
- Hostel Fee: ₹55,000 to ₹70,000 per year (including lodging and mess charges)."""
        },
        {
            "category": "placements",
            "title": "Placement Cell & Career Development",
            "content": """SKASC boasts 100% Placement Support:
- Career Development Cell (CDC) conducts continuous training from Semester 1: Aptitude, Data Structures & Algorithms, Soft Skills, Group Discussions, and Mock Technical Interviews.
- Top Recruiting Partners: TCS, Infosys, Wipro, Cognizant, Zoho, Deloitte, HCL Technologies, Amazon, Accenture, ICICI Bank, Mindtree, and Tech Mahindra.
- Placement Statistics (2025-2026 Batch):
  * Total Offers: 850+
  * Highest CTC: ₹14.5 LPA (awarded by Amazon)
  * Average CTC: ₹4.8 LPA
  * Placement Percentage: 96.8% of eligible students placed!
- Internship Programs: Mandatory summer internships with stipends ranging from ₹10,000 to ₹35,000/month."""
        },
        {
            "category": "timetable",
            "title": "College Timings & Academic Timetable",
            "content": """SKASC Academic Timings and Schedule:
- Shift I (Aided & Self-Finance Morning): 8:30 AM to 1:30 PM (5 periods of 55 minutes each with a 20-minute break at 10:45 AM).
- Shift II (Self-Finance Afternoon): 1:45 PM to 6:30 PM.
- Working Days: Monday to Friday. Alternate Saturdays for co-curricular club activities and industrial seminars.
- Continuous Internal Assessment (CIA): 3 internal cycle tests per semester (CIA-1 in Week 5, CIA-2 in Week 9, Model Exam in Week 14).
- Semester Examinations: Odd Semester exams in November/December; Even Semester exams in April/May."""
        },
        {
            "category": "events",
            "title": "College Fests, Events & Student Life",
            "content": """Vibrant campus life at SKASC:
- Zenith 2K26: SKASC's flagship inter-collegiate cultural fest featuring dance, music, theater, fashion show, gaming, and celebrity concerts. (November 28-29, 2026).
- TechVanza: Annual national-level hackathon and technical symposium with coding battles, web design contests, and robotics.
- Annual Sports Meet: Inter-departmental track, field, and team sports tournaments held every November.
- Active Clubs: Coding Club, AI & Robotics Club, Rotaract Club, NSS, NCC Army & Navy Wings, Literary & Debating Society, Green Campus Club, and Photography Club."""
        },
        {
            "category": "contact",
            "title": "Contact Details, Address & Office Hours",
            "content": """Shree Kandhaswamy Arts & Science College (SKASC)
- Campus Address: SKASC Campus, Coimbatore - 641 008, Tamil Nadu, India.
- Main Office Phone: +91 422 2679 901
- Admission Enquiry Desk: +91 422 2679 902 / +91 94432 12345
- Official Email: info@skasc.ac.in
- Admissions Email: admissions@skasc.ac.in
- Examination Cell Email: coe@skasc.ac.in
- Principal: Dr. A. Kandhaswamy, M.Sc., Ph.D.
- Office Working Hours: Monday to Friday from 8:30 AM to 5:00 PM; Saturday 9:00 AM to 1:00 PM."""
        }
    ]

    for item in college_knowledge:
        CollegeInfo.objects.update_or_create(
            category=item["category"],
            title=item["title"],
            defaults={"content": item["content"]}
        )

    # Departments (matching the 5 cards in the reference Home UI)
    departments_data = [
        {
            "name": "Computer Applications",
            "code": "CA",
            "hod": "Dr. R. Soundararajan",
            "description": "Fostering innovators in Cloud Computing, Artificial Intelligence, and Software Engineering.",
            "courses_offered": "BCA, B.Sc Computer Science, B.Sc AI & Data Science, MCA",
            "icon": "computer",
            "order": 1
        },
        {
            "name": "Science",
            "code": "SCI",
            "hod": "Dr. M. Jayanthi",
            "description": "Pioneering research in Biotechnology, Physics, Chemistry, and Microbiology.",
            "courses_offered": "B.Sc Biotechnology, B.Sc Microbiology, B.Sc Physics, B.Sc Chemistry, M.Sc Biotechnology",
            "icon": "science",
            "order": 2
        },
        {
            "name": "Mathematics",
            "code": "MATH",
            "hod": "Dr. K. Srinivasan",
            "description": "Excellence in Pure & Applied Mathematics, Statistics, and Data Modeling.",
            "courses_offered": "B.Sc Mathematics, M.Sc Mathematics, Certificate in Data Analytics",
            "icon": "math",
            "order": 3
        },
        {
            "name": "Commerce",
            "code": "COMM",
            "hod": "Dr. S. Balasubramanian",
            "description": "Comprehensive accounting, banking, corporate finance, and business administration.",
            "courses_offered": "B.Com General, B.Com Computer Applications, B.Com Professional Accounting, M.Com",
            "icon": "commerce",
            "order": 4
        },
        {
            "name": "Arts",
            "code": "ARTS",
            "hod": "Dr. P. Anuradha",
            "description": "Nurturing creative minds in English Literature, Economics, and Communication.",
            "courses_offered": "B.A. English Literature, B.A. Economics, M.A. English",
            "icon": "arts",
            "order": 5
        }
    ]

    for dept in departments_data:
        Department.objects.update_or_create(
            code=dept["code"],
            defaults=dept
        )

    # Notices (matching the exact notices on the reference Home UI)
    notices_data = [
        {
            "title": "End Semester Exam Schedule Released",
            "date": "Nov 17",
            "category": "Examinations",
            "description": "The detailed timetable for Odd Semester 2026 UG/PG theory and practical examinations has been published on the Student Portal.",
            "order": 1
        },
        {
            "title": "Cultural Fest – Zenith 2K26",
            "date": "Nov 14",
            "category": "Events",
            "description": "Registrations are now open for Zenith 2K26 inter-collegiate mega cultural competitions. Contact student council coordinators.",
            "order": 2
        },
        {
            "title": "Sports Meet Registrations Open",
            "date": "Nov 10",
            "category": "Sports",
            "description": "Annual Inter-Departmental Athletic and Games Tournament registrations are invited. Last date for entry submission is Nov 25.",
            "order": 3
        },
        {
            "title": "Campus Placement Drive - Zoho & TCS",
            "date": "Nov 05",
            "category": "Placements",
            "description": "Pre-placement talk and online aptitude screening for final year BCA, B.Sc CS, and MCA students scheduled on Nov 22.",
            "order": 4
        }
    ]

    for n in notices_data:
        Notice.objects.update_or_create(
            title=n["title"],
            defaults=n
        )

    print("SKASC College data seeded successfully!")
