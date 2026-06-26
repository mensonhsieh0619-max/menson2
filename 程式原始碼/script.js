const STORAGE_KEY = "ai_health_platform_full_state";
const ROLES = {
    user: "一般使用者",
    coach: "健身教練",
    nutritionist: "營養師",
    admin: "系統管理員"
};

const roleHomeSection = {
    user: "user-dashboard-section",
    coach: "coach-dashboard-section",
    nutritionist: "nutrition-dashboard-section",
    admin: "admin-dashboard-section"
};

const rolePermissions = {
    user: [
        "home-section",
        "user-dashboard-section",
        "health-input-section",
        "health-trend-section",
        "ai-health-section",
        "fhir-viewer-section",
        "share-section",
        "registration-section",
        "my-registration-section",
        "notification-section"
    ],
    coach: [
        "home-section",
        "coach-dashboard-section",
        "student-list-section",
        "student-exercise-section",
        "student-heart-rate-section",
        "training-advice-section",
        "training-record-section",
        "notification-section"
    ],
    nutritionist: [
        "home-section",
        "nutrition-dashboard-section",
        "case-list-section",
        "bmi-analysis-section",
        "weight-trend-section",
        "blood-pressure-section",
        "diet-advice-section",
        "nutrition-record-section",
        "notification-section"
    ],
    admin: [
        "home-section",
        "admin-dashboard-section",
        "account-management-section",
        "user-management-section",
        "fhir-record-section",
        "observation-record-section",
        "authorization-record-section",
        "blockchain-section",
        "registration-list-section",
        "registration-review-section",
        "notification-section",
        "system-setting-section"
    ]
};

const NAV_ITEMS = {
    common: [
        ["home-section", "⌂", "首頁"],
        ["account-register-section", "＋", "帳號註冊"],
        ["account-login-section", "↪", "帳號登入"],
        ["notification-section", "●", "通知中心"]
    ],
    user: [
        ["user-dashboard-section", "▣", "個人健康儀表板"],
        ["health-input-section", "✎", "新增健康紀錄"],
        ["health-trend-section", "⌁", "健康趨勢圖"],
        ["ai-health-section", "AI", "AI 健康分析"],
        ["fhir-viewer-section", "{}", "FHIR JSON 展示"],
        ["share-section", "⇄", "授權分享"],
        ["registration-section", "✉", "報名系統"],
        ["my-registration-section", "✓", "我的報名狀態"]
    ],
    coach: [
        ["coach-dashboard-section", "▣", "教練 Dashboard"],
        ["student-list-section", "☷", "學員列表"],
        ["student-exercise-section", "↟", "學員運動資料"],
        ["student-heart-rate-section", "♥", "心率趨勢"],
        ["training-advice-section", "AI", "AI 運動建議"],
        ["training-record-section", "✎", "訓練紀錄"]
    ],
    nutritionist: [
        ["nutrition-dashboard-section", "▣", "營養師 Dashboard"],
        ["case-list-section", "☷", "個案列表"],
        ["bmi-analysis-section", "BMI", "BMI 分析"],
        ["weight-trend-section", "⌁", "體重趨勢"],
        ["blood-pressure-section", "BP", "血壓狀態"],
        ["diet-advice-section", "AI", "AI 飲食建議"],
        ["nutrition-record-section", "✎", "營養追蹤"]
    ],
    admin: [
        ["admin-dashboard-section", "▣", "管理員 Dashboard"],
        ["account-management-section", "⚙", "帳號管理"],
        ["user-management-section", "☷", "使用者列表"],
        ["fhir-record-section", "{}", "FHIR Resource 紀錄"],
        ["observation-record-section", "◫", "Observation 紀錄"],
        ["authorization-record-section", "⇄", "授權紀錄"],
        ["blockchain-section", "#", "區塊鏈紀錄"],
        ["registration-list-section", "☷", "報名紀錄"],
        ["registration-review-section", "✓", "報名審核"],
        ["system-setting-section", "!", "系統通知"]
    ]
};

let state = loadState();
let currentSection = "home-section";

function createDefaultState() {
    const today = "2026-06-24";
    return {
        currentAccountId: null,
        role: null,
        accounts: [
            { id: "acc-user", name: "王小明", email: "user@example.com", username: "user", password: "1234", phone: "0912345678", organization: "FHIR 大學", role: "user", active: true, createdAt: "2026-06-01 09:00" },
            { id: "acc-coach", name: "Coach Mike", email: "coach@example.com", username: "coach", password: "1234", phone: "0922000111", organization: "健康訓練中心", role: "coach", active: true, createdAt: "2026-06-01 09:10" },
            { id: "acc-nutrition", name: "Sarah RD", email: "nutrition@example.com", username: "nutrition", password: "1234", phone: "0933000222", organization: "營養管理診所", role: "nutritionist", active: true, createdAt: "2026-06-01 09:20" },
            { id: "acc-admin", name: "System Admin", email: "admin@example.com", username: "admin", password: "1234", phone: "0944000333", organization: "平台管理中心", role: "admin", active: true, createdAt: "2026-06-01 09:30" }
        ],
        healthRecords: [
            { id: "hr-1", accountId: "acc-user", date: "2026-06-01", systolic: 118, diastolic: 76, weight: 72.5, height: 170, heartRate: 72, steps: 7600, exercise: 30, bmi: 25.1 },
            { id: "hr-2", accountId: "acc-user", date: "2026-06-08", systolic: 124, diastolic: 80, weight: 71.8, height: 170, heartRate: 76, steps: 8900, exercise: 45, bmi: 24.8 },
            { id: "hr-3", accountId: "acc-user", date: "2026-06-15", systolic: 128, diastolic: 82, weight: 71.2, height: 170, heartRate: 78, steps: 9200, exercise: 50, bmi: 24.6 },
            { id: "hr-4", accountId: "acc-user", date: today, systolic: 126, diastolic: 79, weight: 70.8, height: 170, heartRate: 74, steps: 10400, exercise: 55, bmi: 24.5 }
        ],
        authorizations: [
            { id: "auth-1", userId: "acc-user", targetRole: "coach", scope: "exercise", token: "AUTH-COACH-DEMO", createdAt: "2026-06-18 10:00" },
            { id: "auth-2", userId: "acc-user", targetRole: "nutritionist", scope: "nutrition", token: "AUTH-NUTRITION-DEMO", createdAt: "2026-06-18 10:15" }
        ],
        blockchainLogs: [
            { id: "bc-1", hash: "0xA7F391BC8E44", source: "王小明", event: "授權 coach：exercise", createdAt: "2026-06-18 10:00" },
            { id: "bc-2", hash: "0x4B21E0889F02", source: "王小明", event: "授權 nutritionist：nutrition", createdAt: "2026-06-18 10:15" }
        ],
        registrations: [
            {
                id: "REG-20260623-001",
                accountId: "acc-user",
                teamName: "FHIR 健康小隊",
                projectName: "AI 健康追蹤與運動管理平台",
                category: "運動健康",
                leaderName: "王小明",
                email: "test@example.com",
                phone: "0912345678",
                organization: "XX大學",
                members: ["陳小華", "林美玲", "張志明"],
                description: "本作品結合 FHIR、AI 分析與健康資料視覺化。",
                roles: "一般使用者、健身教練、營養師、系統管理員",
                fhirResources: "Patient, Observation, Practitioner",
                githubUrl: "https://github.com/example/ai-health-platform",
                demoUrl: "",
                note: "",
                status: "待審核",
                reviewComment: "",
                createdAt: "2026-06-23 10:30"
            }
        ],
        trainingRecords: [
            { id: "tr-1", coachId: "acc-coach", studentName: "王小明", title: "有氧耐力", content: "維持每週 3 次快走或慢跑，每次 40 分鐘。", createdAt: "2026-06-19 14:00" }
        ],
        nutritionRecords: [
            { id: "nr-1", nutritionistId: "acc-nutrition", caseName: "王小明", title: "低鈉飲食", content: "減少加工食品與高鈉醬料，增加蔬菜攝取。", createdAt: "2026-06-19 15:00" }
        ],
        notifications: [
            { id: "nt-1", accountId: "all", title: "Demo 系統已啟動", message: "可使用 Demo 快速登入展示完整流程。", createdAt: "2026-06-24 09:00" },
            { id: "nt-2", accountId: "acc-user", title: "報名資料已建立", message: "您的競賽報名目前狀態為待審核。", createdAt: "2026-06-23 10:30" }
        ]
    };
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return createDefaultState();
        const loaded = { ...createDefaultState(), ...JSON.parse(raw) };
        const account = loaded.accounts.find((item) => item.id === loaded.currentAccountId);
        loaded.role = account ? account.role : null;
        return loaded;
    } catch (error) {
        console.warn("loadState failed", error);
        return createDefaultState();
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetDemoData() {
    if (!confirm("確定要重置所有 Demo 資料嗎？")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = createDefaultState();
    saveState();
    showToast("Demo 資料已重置");
    navigateTo("home-section");
    renderAll();
}

function currentAccount() {
    return state.accounts.find((account) => account.id === state.currentAccountId) || null;
}

function nowText() {
    const date = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2400);
}

function navigateTo(sectionId) {
    if (!sectionAllowed(sectionId)) {
        sectionId = roleHomeSection[state.role] || "home-section";
    }
    showSection(sectionId);
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSection(sectionId) {
    currentSection = sectionId;
    document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.remove("active");
    });

    const section = document.getElementById(sectionId);
    if (section) section.classList.add("active");

    document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("data-target") === sectionId) {
            item.classList.add("active");
        }
    });
}

function goToRoleHome() {
    const target = roleHomeSection[state.role] || "user-dashboard-section";
    showSection(target);
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function sectionAllowed(sectionId) {
    const account = currentAccount();
    const publicSections = ["home-section", "account-register-section", "account-login-section", "notification-section"];
    if (!account) return publicSections.includes(sectionId);
    return (rolePermissions[state.role] || []).includes(sectionId);
}

function applyRolePermissions() {
    if (!sectionAllowed(currentSection)) {
        currentSection = state.role ? (roleHomeSection[state.role] || "user-dashboard-section") : "home-section";
        showSection(currentSection);
    }
}

function renderSidebarByRole() {
    const account = currentAccount();
    const items = account
        ? (rolePermissions[state.role] || []).map((sectionId) => getNavItem(sectionId))
        : NAV_ITEMS.common;
    document.getElementById("sidebar-nav").innerHTML = items.map(([id, icon, label]) => `
        <button class="nav-item ${id === currentSection ? "active" : ""}" data-target="${id}" onclick="navigateTo('${id}')">
            <span class="nav-icon">${icon}</span>
            <span class="nav-label">${label}</span>
        </button>
    `).join("");

    document.getElementById("logout-button").style.display = account ? "inline-flex" : "none";
    document.getElementById("reset-button").style.display = account?.role === "admin" ? "inline-flex" : "none";
}

function getNavItem(sectionId) {
    const allItems = [...NAV_ITEMS.common, ...NAV_ITEMS.user, ...NAV_ITEMS.coach, ...NAV_ITEMS.nutritionist, ...NAV_ITEMS.admin];
    return allItems.find(([id]) => id === sectionId) || [sectionId, "•", sectionId];
}

function renderAccountChip() {
    const account = currentAccount();
    document.getElementById("account-name").textContent = account ? account.name : "尚未登入";
    document.getElementById("account-role").textContent = account ? ROLES[account.role] : "Guest";
    document.getElementById("account-avatar").textContent = account ? account.name.slice(0, 1).toUpperCase() : "U";
}

function registerAccount(event) {
    event.preventDefault();
    const name = valueOf("register-name");
    const email = valueOf("register-email");
    const username = valueOf("register-username");
    const password = valueOf("register-password");
    const confirmPassword = valueOf("register-password-confirm");
    const role = valueOf("register-role");

    if (password !== confirmPassword) {
        alert("密碼與確認密碼不一致。");
        return;
    }
    if (state.accounts.some((account) => account.username === username)) {
        alert("此帳號已存在。");
        return;
    }

    const account = {
        id: uid("acc"),
        name,
        email,
        username,
        password,
        phone: valueOf("register-phone"),
        organization: valueOf("register-organization"),
        role,
        active: true,
        createdAt: nowText()
    };
    state.accounts.push(account);
    state.currentAccountId = account.id;
    state.role = account.role;
    addNotification(account.id, "帳號註冊成功", `已建立 ${ROLES[role]} 帳號。`);
    saveState();
    document.getElementById("register-form").reset();
    showToast("註冊成功，已登入");
    applyRolePermissions();
    goToRoleHome();
}

function loginAccount(event) {
    event.preventDefault();
    const username = valueOf("login-username");
    const password = valueOf("login-password");
    const account = state.accounts.find((item) => item.username === username && item.password === password);
    if (!account) {
        alert("帳號或密碼錯誤。");
        return;
    }
    if (!account.active) {
        alert("此帳號已停用。");
        return;
    }
    state.currentAccountId = account.id;
    state.role = account.role;
    saveState();
    showToast(`已登入：${account.name}`);
    applyRolePermissions();
    goToRoleHome();
}

function demoLogin(role) {
    const usernameMap = { user: "user", coach: "coach", nutritionist: "nutrition", admin: "admin" };
    const account = state.accounts.find((item) => item.username === usernameMap[role]);
    if (!account) return;
    state.currentAccountId = account.id;
    state.role = account.role;
    saveState();
    showToast(`Demo 快速登入：${ROLES[role]}`);
    applyRolePermissions();
    goToRoleHome();
}

function logoutAccount() {
    state.currentAccountId = null;
    state.role = null;
    saveState();
    showToast("已登出");
    navigateTo("home-section");
}

function roleHome(role) {
    return {
        user: "user-dashboard-section",
        coach: "coach-dashboard-section",
        nutritionist: "nutrition-dashboard-section",
        admin: "admin-dashboard-section"
    }[role] || "home-section";
}

function valueOf(id) {
    return document.getElementById(id).value.trim();
}

function currentUserHealthRecords(accountId = currentAccount()?.id) {
    return state.healthRecords.filter((record) => record.accountId === accountId).sort((a, b) => a.date.localeCompare(b.date));
}

function latestRecord(accountId = currentAccount()?.id) {
    const records = currentUserHealthRecords(accountId);
    return records[records.length - 1] || null;
}

function calculateBMI(weight, height) {
    const heightM = Number(height) / 100;
    return Number((Number(weight) / (heightM * heightM)).toFixed(1));
}

function bmiCategory(bmi) {
    if (bmi < 18.5) return "體重過輕";
    if (bmi <= 24) return "正常";
    if (bmi <= 27) return "過重";
    return "肥胖";
}

function submitHealthData(event) {
    event.preventDefault();
    const account = currentAccount();
    if (!account || account.role !== "user") {
        alert("請以一般使用者登入。");
        return;
    }
    const weight = Number(valueOf("health-weight"));
    const height = Number(valueOf("health-height"));
    const record = {
        id: uid("hr"),
        accountId: account.id,
        date: valueOf("health-date"),
        systolic: Number(valueOf("health-systolic")),
        diastolic: Number(valueOf("health-diastolic")),
        weight,
        height,
        heartRate: Number(valueOf("health-heart-rate")),
        steps: Number(valueOf("health-steps")),
        exercise: Number(valueOf("health-exercise")),
        bmi: calculateBMI(weight, height)
    };
    state.healthRecords.push(record);
    addNotification(account.id, "健康紀錄已新增", `BMI ${record.bmi}，已同步更新 FHIR 與 AI 分析。`);
    saveState();
    showToast("健康紀錄已儲存");
    renderAll();
}

function generateFHIRBundle(accountId = currentAccount()?.id) {
    const account = state.accounts.find((item) => item.id === accountId);
    const records = currentUserHealthRecords(accountId);
    const latest = records[records.length - 1];
    if (!account || !latest) return {};

    const observations = [
        observation("Blood Pressure", "85354-9", `${latest.systolic}/${latest.diastolic}`, "mmHg", latest.date, account.id),
        observation("Body Weight", "29463-7", latest.weight, "kg", latest.date, account.id),
        observation("Heart Rate", "8867-4", latest.heartRate, "beats/min", latest.date, account.id),
        observation("BMI", "39156-5", latest.bmi, "kg/m2", latest.date, account.id),
        observation("Steps", "41950-7", latest.steps, "steps", latest.date, account.id),
        observation("Exercise", "55411-3", latest.exercise, "min", latest.date, account.id)
    ];

    return {
        resourceType: "Bundle",
        type: "collection",
        timestamp: new Date().toISOString(),
        entry: [
            {
                resource: {
                    resourceType: "Patient",
                    id: account.id,
                    name: [{ text: account.name }],
                    telecom: [{ system: "email", value: account.email }, { system: "phone", value: account.phone }],
                    managingOrganization: { display: account.organization }
                }
            },
            {
                resource: {
                    resourceType: "Practitioner",
                    id: "practitioner-demo-001",
                    name: [{ text: "Dr. Weaver" }],
                    qualification: [{ code: { text: "Health Data Consultant" } }]
                }
            },
            ...observations.map((resource) => ({ resource }))
        ]
    };
}

function observation(display, code, value, unit, date, accountId) {
    return {
        resourceType: "Observation",
        status: "final",
        code: { coding: [{ system: "http://loinc.org", code, display }] },
        subject: { reference: `Patient/${accountId}` },
        effectiveDateTime: date,
        valueQuantity: { value, unit }
    };
}

function runAIAnalysis(accountId = currentAccount()?.id) {
    const records = currentUserHealthRecords(accountId);
    const latest = records[records.length - 1];
    const weeklyExercise = records.slice(-7).reduce((sum, record) => sum + Number(record.exercise || 0), 0);
    if (!latest) {
        return { score: 0, risk: "無資料", dietAdvice: "尚無資料。", exerciseAdvice: "尚無資料。", medicalAdvice: "尚無資料。", findings: [] };
    }

    let score = 95;
    const findings = [];
    let risk = "低風險";
    let dietAdvice = "維持均衡飲食，多攝取蔬菜、優質蛋白與足量水分。";
    let exerciseAdvice = "維持每週至少 150 分鐘中等強度運動。";
    let medicalAdvice = "目前無立即就醫警訊，請持續追蹤。";

    if (latest.bmi < 18.5) {
        score -= 10;
        findings.push("BMI < 18.5：體重過輕");
        dietAdvice = "建議增加總熱量與蛋白質攝取，安排規律正餐。";
    } else if (latest.bmi <= 24) {
        findings.push("BMI 18.5～24：正常");
    } else if (latest.bmi <= 27) {
        score -= 8;
        findings.push("BMI 24～27：過重");
        dietAdvice = "建議減少含糖飲料、精緻澱粉與宵夜頻率。";
    } else {
        score -= 18;
        risk = "中風險";
        findings.push("BMI > 27：肥胖");
        dietAdvice = "建議建立熱量赤字，增加蔬菜、蛋白質與全穀類比例。";
    }

    if (latest.systolic >= 130 || latest.diastolic >= 80) {
        score -= 15;
        risk = "中風險";
        findings.push("收縮壓 >= 130 或舒張壓 >= 80：血壓偏高");
        dietAdvice = "血壓偏高，建議降低鈉攝取並避免加工食品。";
        medicalAdvice = "若血壓持續偏高，建議諮詢醫師進一步評估。";
    }

    if (latest.heartRate > 100) {
        score -= 12;
        risk = "高風險";
        findings.push("靜息心率 > 100：心率偏高");
        medicalAdvice = "靜息心率偏高，若伴隨胸悶、暈眩或不適請就醫。";
    }

    if (weeklyExercise < 150) {
        score -= 10;
        findings.push("每週運動時間 < 150 分鐘：運動量不足");
        exerciseAdvice = "本週運動量不足，可從每日 20 至 30 分鐘快走開始。";
    }

    if (score < 70 && risk !== "高風險") risk = "中風險";
    return { score: Math.max(0, score), risk, dietAdvice, exerciseAdvice, medicalAdvice, findings, weeklyExercise };
}

function submitRegistration(event) {
    event.preventDefault();
    const account = currentAccount();
    if (!account || account.role !== "user") {
        alert("請以一般使用者登入後報名。");
        return;
    }
    const registration = {
        id: generateRegistrationId(),
        accountId: account.id,
        teamName: valueOf("reg-team-name"),
        projectName: valueOf("reg-project-name"),
        category: valueOf("reg-category"),
        leaderName: valueOf("reg-leader-name"),
        email: valueOf("reg-email"),
        phone: valueOf("reg-phone"),
        organization: valueOf("reg-organization"),
        members: [valueOf("reg-member-1"), valueOf("reg-member-2"), valueOf("reg-member-3")].filter(Boolean),
        description: valueOf("reg-description"),
        roles: valueOf("reg-roles"),
        fhirResources: valueOf("reg-fhir-resources"),
        githubUrl: valueOf("reg-github-url"),
        demoUrl: valueOf("reg-demo-url"),
        note: valueOf("reg-note"),
        status: "待審核",
        reviewComment: "",
        createdAt: nowText()
    };
    state.registrations.push(registration);
    addNotification(account.id, "競賽報名已送出", `${registration.id} 目前狀態為待審核。`);
    saveState();
    document.getElementById("registration-form").reset();
    showToast("報名已送出");
    navigateTo("my-registration-section");
}

function generateRegistrationId() {
    const date = new Date();
    const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    const count = state.registrations.filter((item) => item.id.startsWith(`REG-${ymd}`)).length + 1;
    return `REG-${ymd}-${String(count).padStart(3, "0")}`;
}

function renderRegistrationList() {
    const body = document.getElementById("registration-list-body");
    if (!body) return;
    body.innerHTML = state.registrations.map((item) => `
        <tr>
            <td>${item.id}</td>
            <td>${escapeHTML(item.teamName)}</td>
            <td>${escapeHTML(item.projectName)}</td>
            <td>${escapeHTML(item.category)}</td>
            <td>${escapeHTML(item.leaderName)}</td>
            <td>${escapeHTML(item.email)}</td>
            <td>${item.githubUrl ? `<a href="${escapeHTML(item.githubUrl)}" target="_blank">GitHub</a>` : "未填寫"}</td>
            <td>${statusBadge(item.status)}</td>
            <td>${item.createdAt}</td>
        </tr>
    `).join("") || emptyRow(9);
}

function renderRegistrationReview() {
    const panel = document.getElementById("registration-review-panel");
    if (!panel) return;
    panel.innerHTML = state.registrations.map((item) => `
        <div class="review-card">
            <div class="review-card-header">
                <div>
                    <strong>${escapeHTML(item.teamName)}｜${escapeHTML(item.projectName)}</strong>
                    <p class="muted">${item.id} · ${escapeHTML(item.leaderName)} · ${item.createdAt}</p>
                </div>
                ${statusBadge(item.status)}
            </div>
            <p>${escapeHTML(item.description)}</p>
            <div class="review-controls">
                <label>狀態<select id="review-status-${item.id}">
                    ${["待審核", "審核通過", "需補件", "未通過"].map((status) => `<option ${status === item.status ? "selected" : ""}>${status}</option>`).join("")}
                </select></label>
                <label>審核意見<textarea id="review-comment-${item.id}">${escapeHTML(item.reviewComment)}</textarea></label>
                <button class="primary-button" onclick="updateRegistrationStatus('${item.id}')">儲存</button>
            </div>
        </div>
    `).join("") || `<div class="card empty">目前尚無報名資料。</div>`;
}

function updateRegistrationStatus(id) {
    const item = state.registrations.find((registration) => registration.id === id);
    if (!item) return;
    item.status = document.getElementById(`review-status-${id}`).value;
    item.reviewComment = document.getElementById(`review-comment-${id}`).value.trim();
    addNotification(item.accountId, "報名審核結果更新", `您的報名資料已${item.status}。`);
    saveState();
    showToast("審核結果已更新");
    renderAll();
}

function generateQRCode(event) {
    event.preventDefault();
    const account = currentAccount();
    if (!account || account.role !== "user") {
        alert("請以一般使用者登入。");
        return;
    }
    const targetRole = valueOf("share-target-role");
    const scope = valueOf("share-scope");
    const token = `AUTH-${account.id}-${targetRole}-${Date.now()}`;
    const auth = { id: uid("auth"), userId: account.id, targetRole, scope, token, createdAt: nowText() };
    state.authorizations.push(auth);
    addBlockchainLog(account.name, `授權 ${targetRole}：${scope}`, token);
    addNotification(account.id, "授權分享已建立", `已授權 ${ROLES[targetRole]} 查看 ${scope}。`);
    saveState();
    drawQRCode(token);
    document.getElementById("qr-token").textContent = token;
    showToast("授權 QR Code 已產生");
    renderAll();
}

function drawQRCode(token) {
    const canvas = document.getElementById("qr-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const cells = 21;
    const cell = size / cells;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    let seed = 0;
    for (const char of token) seed = (seed + char.charCodeAt(0) * 17) % 9973;
    for (let y = 0; y < cells; y += 1) {
        for (let x = 0; x < cells; x += 1) {
            const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
            const on = finder ? (x === 0 || y === 0 || x === 6 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4)) : ((x * 31 + y * 17 + seed) % 5 < 2);
            if (on) {
                ctx.fillStyle = "#0f172a";
                ctx.fillRect(Math.floor(x * cell), Math.floor(y * cell), Math.ceil(cell), Math.ceil(cell));
            }
        }
    }
}

function addBlockchainLog(source, event, token) {
    const hash = `0x${hashText(`${source}-${event}-${token}`).toUpperCase()}`;
    state.blockchainLogs.unshift({ id: uid("bc"), hash, source, event, createdAt: nowText() });
}

function hashText(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
        hash ^= text.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return (hash >>> 0).toString(16).padStart(8, "0") + Math.random().toString(16).slice(2, 8);
}

function addNotification(accountId, title, message) {
    state.notifications.unshift({ id: uid("nt"), accountId, title, message, createdAt: nowText() });
}

function renderNotifications() {
    const account = currentAccount();
    const notifications = state.notifications.filter((item) => item.accountId === "all" || item.accountId === account?.id || account?.role === "admin");
    const html = notifications.map((item) => `<div class="timeline-item"><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.message)}</p><small class="muted">${item.createdAt}</small></div>`).join("") || `<div class="card empty">目前沒有通知。</div>`;
    setHTML("notification-list", html);
    setHTML("system-notification-list", html);
}

function renderAll() {
    applyRolePermissions();
    renderSidebarByRole();
    renderAccountChip();
    renderHomeStats();
    renderUserDashboard();
    renderCoachDashboard();
    renderNutritionDashboard();
    renderAdminDashboard();
    renderFHIRViewer();
    renderAIHealth();
    renderUserTables();
    renderCoachViews();
    renderNutritionViews();
    renderAdminViews();
    renderRegistrationList();
    renderRegistrationReview();
    renderNotifications();
    renderCharts();
}

function renderHomeStats() {
    const account = currentAccount() || state.accounts.find((item) => item.role === "user");
    const bundle = generateFHIRBundle(account?.id);
    const analysis = runAIAnalysis(account?.id);
    const registration = state.registrations.find((item) => item.accountId === account?.id);
    setText("hero-observation-count", bundle.entry ? bundle.entry.filter((entry) => entry.resource.resourceType === "Observation").length : 0);
    setText("hero-health-score", analysis.score || "--");
    setText("hero-registration-status", registration?.status || "--");
}

function renderUserDashboard() {
    const account = currentAccount();
    if (!account) return;
    const latest = latestRecord(account.id);
    const analysis = runAIAnalysis(account.id);
    const registration = state.registrations.find((item) => item.accountId === account.id);
    setHTML("user-dashboard-cards", [
        kpi("血壓", latest ? `${latest.systolic}/${latest.diastolic}` : "--", "mmHg"),
        kpi("體重", latest?.weight ?? "--", "kg"),
        kpi("BMI", latest?.bmi ?? "--", latest ? bmiCategory(latest.bmi) : ""),
        kpi("心率", latest?.heartRate ?? "--", "bpm"),
        kpi("步數", latest?.steps?.toLocaleString() ?? "--", "steps"),
        kpi("運動時間", latest?.exercise ?? "--", "min"),
        kpi("健康分數", analysis.score, analysis.risk),
        kpi("報名狀態", registration?.status || "尚未報名", registration?.id || "")
    ].join(""));
}

function renderCoachDashboard() {
    const students = authorizedUsers("coach");
    const records = students.flatMap((student) => currentUserHealthRecords(student.id));
    const avgExercise = average(records.map((record) => record.exercise));
    const avgSteps = average(records.map((record) => record.steps));
    setHTML("coach-dashboard-cards", [
        kpi("授權學員", students.length, "人"),
        kpi("平均步數", Math.round(avgSteps || 0).toLocaleString(), "steps"),
        kpi("平均運動時間", Math.round(avgExercise || 0), "min"),
        kpi("達標學員", students.filter((student) => runAIAnalysis(student.id).weeklyExercise >= 150).length, "人")
    ].join(""));
}

function renderNutritionDashboard() {
    const cases = authorizedUsers("nutritionist");
    const latest = cases.map((item) => latestRecord(item.id)).filter(Boolean);
    setHTML("nutrition-dashboard-cards", [
        kpi("授權個案", cases.length, "人"),
        kpi("平均 BMI", average(latest.map((record) => record.bmi)).toFixed(1), ""),
        kpi("血壓偏高", latest.filter((record) => record.systolic >= 130 || record.diastolic >= 80).length, "人"),
        kpi("需飲食追蹤", latest.filter((record) => record.bmi > 24).length, "人")
    ].join(""));
}

function renderAdminDashboard() {
    setHTML("admin-dashboard-cards", [
        kpi("帳號數", state.accounts.length, "個"),
        kpi("Observation", state.healthRecords.length * 6, "筆"),
        kpi("授權紀錄", state.authorizations.length, "筆"),
        kpi("區塊鏈 Hash", state.blockchainLogs.length, "筆"),
        kpi("報名總數", state.registrations.length, "筆"),
        kpi("待審核", state.registrations.filter((item) => item.status === "待審核").length, "筆")
    ].join(""));
}

function renderFHIRViewer() {
    setText("fhir-json-output", JSON.stringify(generateFHIRBundle(), null, 2));
}

function renderAIHealth() {
    const account = currentAccount() || state.accounts.find((item) => item.role === "user");
    const analysis = runAIAnalysis(account?.id);
    setHTML("ai-health-panel", `
        <div class="ai-panel">
            <div class="score-ring"><div><span>健康分數</span><strong>${analysis.score}</strong><small>${analysis.risk}</small></div></div>
            <div class="advice-list">
                <div class="advice-item"><strong>規則判讀</strong><p>${analysis.findings.map(escapeHTML).join("、") || "目前無異常規則命中。"}</p></div>
                <div class="advice-item"><strong>飲食建議</strong><p>${escapeHTML(analysis.dietAdvice)}</p></div>
                <div class="advice-item"><strong>運動建議</strong><p>${escapeHTML(analysis.exerciseAdvice)}</p></div>
                <div class="advice-item"><strong>就醫提醒</strong><p>${escapeHTML(analysis.medicalAdvice)}</p></div>
            </div>
        </div>
    `);
}

function renderUserTables() {
    const account = currentAccount();
    if (!account) return;
    setHTML("my-registration-body", state.registrations.filter((item) => item.accountId === account.id).map((item) => `
        <tr><td>${item.id}</td><td>${escapeHTML(item.teamName)}</td><td>${escapeHTML(item.projectName)}</td><td>${statusBadge(item.status)}</td><td>${escapeHTML(item.reviewComment || "尚無")}</td><td>${item.createdAt}</td></tr>
    `).join("") || emptyRow(6));
}

function renderCoachViews() {
    const students = authorizedUsers("coach");
    setHTML("student-list-body", students.map((student) => {
        const latest = latestRecord(student.id);
        const auth = latestAuthorization(student.id, "coach");
        return `<tr><td>${student.name}</td><td>${student.email}</td><td>${latest?.steps ?? "--"}</td><td>${latest?.exercise ?? "--"} min</td><td>${auth?.createdAt || "--"}</td></tr>`;
    }).join("") || emptyRow(5));
    setHTML("student-exercise-panel", students.map((student) => {
        const latest = latestRecord(student.id);
        const analysis = runAIAnalysis(student.id);
        return `<div class="card"><h3>${student.name}</h3><p>步數：${latest?.steps ?? "--"}｜運動時間：${latest?.exercise ?? "--"} 分鐘｜週運動：${analysis.weeklyExercise || 0} 分鐘</p><p>達成率：${Math.min(100, Math.round(((analysis.weeklyExercise || 0) / 150) * 100))}%</p></div>`;
    }).join("") || `<div class="card empty">尚無授權學員。</div>`);
    setHTML("training-advice-panel", students.map((student) => {
        const analysis = runAIAnalysis(student.id);
        return `<div class="card"><h3>${student.name}</h3><p>${escapeHTML(analysis.exerciseAdvice)}</p></div>`;
    }).join("") || `<div class="card empty">尚無授權學員。</div>`);
    setHTML("training-record-list", state.trainingRecords.map((item) => `<div class="record-card"><strong>${escapeHTML(item.studentName)}｜${escapeHTML(item.title)}</strong><p>${escapeHTML(item.content)}</p><small class="muted">${item.createdAt}</small></div>`).join(""));
}

function renderNutritionViews() {
    const cases = authorizedUsers("nutritionist");
    setHTML("case-list-body", cases.map((person) => {
        const latest = latestRecord(person.id);
        const auth = latestAuthorization(person.id, "nutritionist");
        return `<tr><td>${person.name}</td><td>${latest?.bmi ?? "--"}</td><td>${latest?.weight ?? "--"} kg</td><td>${latest ? `${latest.systolic}/${latest.diastolic}` : "--"}</td><td>${auth?.createdAt || "--"}</td></tr>`;
    }).join("") || emptyRow(5));
    setHTML("bmi-analysis-panel", cases.map((person) => {
        const latest = latestRecord(person.id);
        return `<div class="card"><h3>${person.name}</h3><p>BMI：${latest?.bmi ?? "--"}｜${latest ? bmiCategory(latest.bmi) : "--"}</p></div>`;
    }).join("") || `<div class="card empty">尚無授權個案。</div>`);
    setHTML("blood-pressure-panel", cases.map((person) => {
        const latest = latestRecord(person.id);
        const high = latest && (latest.systolic >= 130 || latest.diastolic >= 80);
        return `<div class="card"><h3>${person.name}</h3><p>血壓：${latest ? `${latest.systolic}/${latest.diastolic}` : "--"}｜${high ? "偏高" : "正常"}</p></div>`;
    }).join("") || `<div class="card empty">尚無授權個案。</div>`);
    setHTML("diet-advice-panel", cases.map((person) => {
        const analysis = runAIAnalysis(person.id);
        return `<div class="card"><h3>${person.name}</h3><p>${escapeHTML(analysis.dietAdvice)}</p></div>`;
    }).join("") || `<div class="card empty">尚無授權個案。</div>`);
    setHTML("nutrition-record-list", state.nutritionRecords.map((item) => `<div class="record-card"><strong>${escapeHTML(item.caseName)}｜${escapeHTML(item.title)}</strong><p>${escapeHTML(item.content)}</p><small class="muted">${item.createdAt}</small></div>`).join(""));
}

function renderAdminViews() {
    setHTML("account-management-body", state.accounts.map((account) => `
        <tr>
            <td>${account.name}</td><td>${account.username}</td><td>${account.email}</td><td>${ROLES[account.role]}</td><td>${account.active ? statusPill("啟用", "active") : statusPill("停用", "disabled")}</td>
            <td><button class="mini-button" onclick="toggleAccount('${account.id}')">${account.active ? "停用" : "啟用"}</button> <button class="mini-button" onclick="deleteAccount('${account.id}')">刪除</button></td>
        </tr>
    `).join(""));
    setHTML("user-management-body", state.accounts.map((account) => `<tr><td>${account.name}</td><td>${account.email}</td><td>${ROLES[account.role]}</td><td>${account.organization}</td><td>${account.phone}</td></tr>`).join(""));
    setHTML("fhir-record-list", state.accounts.filter((account) => account.role === "user").map((account) => `<div class="card"><h3>${account.name}</h3><pre class="code-block">${escapeHTML(JSON.stringify(generateFHIRBundle(account.id), null, 2))}</pre></div>`).join(""));
    setHTML("observation-record-panel", `<div class="kpi-grid">${kpi("健康紀錄", state.healthRecords.length, "筆")}${kpi("Observation", state.healthRecords.length * 6, "筆")}${kpi("使用者", state.accounts.filter((item) => item.role === "user").length, "人")}</div>`);
    setHTML("authorization-record-body", state.authorizations.map((auth) => {
        const user = state.accounts.find((account) => account.id === auth.userId);
        return `<tr><td>${user?.name || "--"}</td><td>${ROLES[auth.targetRole]}</td><td>${auth.scope}</td><td>${auth.token}</td><td>${auth.createdAt}</td></tr>`;
    }).join("") || emptyRow(5));
    setHTML("blockchain-body", state.blockchainLogs.map((log) => `<tr><td><code>${log.hash}</code></td><td>${escapeHTML(log.source)}</td><td>${escapeHTML(log.event)}</td><td>${log.createdAt}</td></tr>`).join("") || emptyRow(4));
}

function addTrainingRecord(event) {
    event.preventDefault();
    const account = currentAccount();
    state.trainingRecords.unshift({ id: uid("tr"), coachId: account.id, studentName: valueOf("training-student"), title: valueOf("training-title"), content: valueOf("training-content"), createdAt: nowText() });
    event.target.reset();
    saveState();
    showToast("訓練紀錄已新增");
    renderAll();
}

function addNutritionRecord(event) {
    event.preventDefault();
    const account = currentAccount();
    state.nutritionRecords.unshift({ id: uid("nr"), nutritionistId: account.id, caseName: valueOf("nutrition-case"), title: valueOf("nutrition-title"), content: valueOf("nutrition-content"), createdAt: nowText() });
    event.target.reset();
    saveState();
    showToast("營養紀錄已新增");
    renderAll();
}

function authorizedUsers(targetRole) {
    const ids = state.authorizations.filter((auth) => auth.targetRole === targetRole).map((auth) => auth.userId);
    return state.accounts.filter((account) => ids.includes(account.id));
}

function latestAuthorization(userId, targetRole) {
    return state.authorizations.filter((auth) => auth.userId === userId && auth.targetRole === targetRole).slice(-1)[0];
}

function toggleAccount(id) {
    const account = state.accounts.find((item) => item.id === id);
    if (!account) return;
    account.active = !account.active;
    saveState();
    renderAll();
}

function deleteAccount(id) {
    if (id === state.currentAccountId) {
        alert("不能刪除目前登入帳號。");
        return;
    }
    if (!confirm("確定刪除此帳號？")) return;
    state.accounts = state.accounts.filter((account) => account.id !== id);
    saveState();
    renderAll();
}

function renderCharts() {
    const account = currentAccount() || state.accounts.find((item) => item.role === "user");
    const records = currentUserHealthRecords(account?.role === "user" ? account.id : state.accounts.find((item) => item.role === "user")?.id);
    drawLineChart("bp-chart", records, [(r) => r.systolic, (r) => r.diastolic], ["#dc2626", "#2563eb"]);
    drawLineChart("weight-chart", records, [(r) => r.weight], ["#0ea5a3"]);
    drawLineChart("heart-chart", records, [(r) => r.heartRate], ["#db2777"]);
    drawLineChart("exercise-chart", records, [(r) => r.exercise], ["#16a34a"]);
    drawLineChart("student-heart-chart", records, [(r) => r.heartRate], ["#db2777"]);
    drawLineChart("nutrition-weight-chart", records, [(r) => r.weight], ["#0ea5a3"]);
}

function drawLineChart(canvasId, records, series, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !records?.length) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width = canvas.clientWidth || 600;
    const height = canvas.height = Number(canvas.getAttribute("height")) || 220;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    const padding = 32;
    const values = series.flatMap((getter) => records.map(getter));
    const min = Math.min(...values) * 0.95;
    const max = Math.max(...values) * 1.05;
    ctx.strokeStyle = "#dbe4ee";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i += 1) {
        const y = padding + ((height - padding * 2) / 3) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    series.forEach((getter, index) => {
        ctx.strokeStyle = colors[index];
        ctx.lineWidth = 3;
        ctx.beginPath();
        records.forEach((record, i) => {
            const x = padding + ((width - padding * 2) / Math.max(1, records.length - 1)) * i;
            const y = height - padding - ((getter(record) - min) / Math.max(1, max - min)) * (height - padding * 2);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
    });
}

function copyFHIR() {
    const text = document.getElementById("fhir-json-output").textContent;
    navigator.clipboard?.writeText(text);
    showToast("FHIR JSON 已複製");
}

function kpi(title, value, caption) {
    return `<div class="kpi-card"><span>${escapeHTML(title)}</span><strong>${value}</strong><small>${escapeHTML(caption || "")}</small></div>`;
}

function statusBadge(status) {
    const className = { "待審核": "pending", "審核通過": "approved", "需補件": "revision", "未通過": "rejected" }[status] || "pending";
    return statusPill(status, className);
}

function statusPill(label, className) {
    return `<span class="status ${className}">${escapeHTML(label)}</span>`;
}

function emptyRow(cols) {
    return `<tr><td colspan="${cols}" class="empty">目前沒有資料。</td></tr>`;
}

function average(values) {
    const clean = values.filter((value) => Number.isFinite(Number(value)));
    if (!clean.length) return 0;
    return clean.reduce((sum, value) => sum + Number(value), 0) / clean.length;
}

function setHTML(id, html) {
    const element = document.getElementById(id);
    if (element) element.innerHTML = html;
}

function setText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

window.registerAccount = registerAccount;
window.loginAccount = loginAccount;
window.demoLogin = demoLogin;
window.logoutAccount = logoutAccount;
window.showSection = showSection;
window.goToRoleHome = goToRoleHome;
window.applyRolePermissions = applyRolePermissions;
window.renderSidebarByRole = renderSidebarByRole;
window.renderUserDashboard = renderUserDashboard;
window.renderCoachDashboard = renderCoachDashboard;
window.renderNutritionDashboard = renderNutritionDashboard;
window.renderAdminDashboard = renderAdminDashboard;
window.submitHealthData = submitHealthData;
window.generateFHIRBundle = generateFHIRBundle;
window.runAIAnalysis = runAIAnalysis;
window.submitRegistration = submitRegistration;
window.renderRegistrationList = renderRegistrationList;
window.renderRegistrationReview = renderRegistrationReview;
window.updateRegistrationStatus = updateRegistrationStatus;
window.generateQRCode = generateQRCode;
window.addBlockchainLog = addBlockchainLog;
window.renderNotifications = renderNotifications;
window.saveState = saveState;
window.loadState = loadState;
window.resetDemoData = resetDemoData;

window.addEventListener("load", () => {
    const todayInput = document.getElementById("health-date");
    if (todayInput) todayInput.value = new Date().toISOString().slice(0, 10);
    drawQRCode("AI-HEALTH-DEMO");
    applyRolePermissions();
    navigateTo(currentSection);
});
