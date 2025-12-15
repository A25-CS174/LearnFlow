// ===== BASE URL =====
const API_BASE_URL = "https://api.rakasatriaefendi.site/api";

// Ambil token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Ambil current user id dari localStorage.user atau decode token JWT
export const getCurrentUserId = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const u = JSON.parse(userStr);
      if (u && u.id) return u.id;
    }
  } catch {}
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    return payload?.id ?? null;
  } catch {
    return null;
  }
};

// Selected Learning Path helpers (scoped per user)
export const getSelectedLearningPath = () => {
  const uid = getCurrentUserId() ?? "guest";
  const key = `selectedLearningPath:${uid}`;
  const v =
    localStorage.getItem(key) || localStorage.getItem("selectedLearningPath");
  return v ? parseInt(v) : null;
};

export const setSelectedLearningPath = (id) => {
  const uid = getCurrentUserId() ?? "guest";
  const key = `selectedLearningPath:${uid}`;
  localStorage.setItem(key, String(id));
  // remove old global key to avoid confusion
  localStorage.removeItem("selectedLearningPath");
};

export const removeSelectedLearningPath = () => {
  const uid = getCurrentUserId() ?? "guest";
  const key = `selectedLearningPath:${uid}`;
  localStorage.removeItem(key);
  localStorage.removeItem("selectedLearningPath");
};

// Handler Response
const handleResponse = async (response) => {
  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Response tidak valid dari server");
  }

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};

// =============================
// AUTH API
// =============================
export const authAPI = {
  register: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  login: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// =============================
// USERS API
// =============================
export const usersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getChart: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/chart/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  add: async (data) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// =============================
// PROGRESS API
// =============================
export const progressAPI = {
  getOverview: async () => {
    const response = await fetch(`${API_BASE_URL}/progress/overview`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateModule: async (moduleId, data) => {
    const response = await fetch(
      `${API_BASE_URL}/progress/module/${moduleId}/update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(data),
      }
    );
    return handleResponse(response);
  },

  getChart: async () => {
    const response = await fetch(`${API_BASE_URL}/progress/chart`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getModulesBar: async () => {
    const response = await fetch(`${API_BASE_URL}/progress/modules/bar`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// =============================
// MODULES API
// =============================
export const modulesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/modules`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (moduleId) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getChapters: async (moduleId) => {
    const response = await fetch(
      `${API_BASE_URL}/modules/${moduleId}/chapters`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  getChapter: async (moduleId, chapterId) => {
    const response = await fetch(
      `${API_BASE_URL}/modules/${moduleId}/chapters/${chapterId}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  getSubchapters: async (moduleId, chapterId) => {
    const response = await fetch(
      `${API_BASE_URL}/modules/${moduleId}/chapters/${chapterId}/subchapters`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  getSubchapter: async (moduleId, chapterId, subchapterId) => {
    const response = await fetch(
      `${API_BASE_URL}/modules/${moduleId}/chapters/${chapterId}/subchapters/${subchapterId}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  getSubchapterFull: async (subId) => {
    const modules = await modulesAPI.getAll();
    for (const m of modules) {
      const chapters = await modulesAPI.getChapters(m.id);
      for (const ch of chapters) {
        const subs = await modulesAPI.getSubchapters(m.id, ch.id);
        const sub = subs.find((s) => s.id === subId);
        if (sub)
          return {
            module: m,
            chapter: ch,
            subchapter: sub,
            allSubchapters: subs,
            allChapters: chapters,
          };
      }
    }
    throw new Error("Subchapter tidak ditemukan");
  },

  updateSubchapter: async (moduleId, chapterId, subchapterId, data) => {
    const response = await fetch(
      `${API_BASE_URL}/modules/${moduleId}/chapters/${chapterId}/subchapters/${subchapterId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(data),
      }
    );
    return handleResponse(response);
  },
};

// =============================
// LEARNING PATHS API
// =============================
export const learningPathsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/learning-paths`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (learningpathId) => {
    const response = await fetch(
      `${API_BASE_URL}/learning-paths/${learningpathId}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },
};

// =============================
// LANGGANAN / SUBSCRIPTION API
// =============================
export const subscriptionsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/langganan`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  add: async (data) => {
    const response = await fetch(`${API_BASE_URL}/langganan`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/langganan/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/langganan/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};
