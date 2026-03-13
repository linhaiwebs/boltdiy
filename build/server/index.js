import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Meta, Links, Outlet, ScrollRestoration, Scripts, RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';
import { createHead, renderHeadToString } from 'remix-island';
import { useStore } from '@nanostores/react';
import { DirectionProvider } from '@radix-ui/react-direction';
import * as React from 'react';
import React__default, { useContext, createContext, useState, useEffect, memo, useMemo } from 'react';
import { createBrowserClient, parse, createServerClient, serialize } from '@supabase/ssr';
import { atom, map, computed } from 'nanostores';
import { json, redirect } from '@remix-run/cloudflare';
import process from 'vite-plugin-node-polyfills/shims/process';
import { streamText as streamText$1 } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { createMistral } from '@ai-sdk/mistral';
import { createXai } from '@ai-sdk/xai';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createAnthropic } from '@ai-sdk/anthropic';
import { defaultSchema } from 'rehype-sanitize';
import { ClientOnly } from 'remix-utils/client-only';
import { motion, cubicBezier } from 'framer-motion';
import { Sparkles, ChevronDown, Check, Lock, Zap, Brain, Eye, Wrench, Database, Loader, Upload, X, Code, Rocket, CloudOff, Cloud, Globe, ChevronUp, ChevronRight, Circle, FolderKanban, MoveVertical, CreditCard, Share2, Trash2, Clock, Calendar, KeyRound, ArrowLeft, Plus, CircleCheck, User, Settings } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { toast } from 'react-toastify';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as Tooltip$1 from '@radix-ui/react-tooltip';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext, FormProvider, Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Root } from '@radix-ui/react-dialog';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { Buffer } from 'vite-plugin-node-polyfills/shims/buffer';
import * as nodePath from 'pathe';
import { createTwoFilesPatch } from 'diff';
import '@webcontainer/api';

const xtermStyles = "/assets/xterm-qxJ8_QYu.css";

const reactToastifyStyles = "/assets/ReactToastify-VYesxZYF.css";

function createClient() {
  const supabaseUrl = "https://nzhkrblsjcqxzfpqhxty.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56aGtyYmxzamNxeHpmcHFoeHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MTEzNjEsImV4cCI6MjA4ODk4NzM2MX0.uYqymdptCcG1-CYgF8dlQZtidBXSg2aur5hXy2ikXbw";
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
const supabase = createClient();

const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return () => {
      };
    }
    supabase.auth.getSession().then(({ data: { session: session2 }, error }) => {
      if (error) {
        console.error("Auth getSession error:", error);
      }
      setSession(session2);
      setUser(session2?.user ?? null);
      setLoading(false);
    }).catch((error) => {
      console.error("Auth getSession promise error:", error);
      setLoading(false);
    });
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session2) => {
      setSession(session2);
      setUser(session2?.user ?? null);
      setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const signIn = async (email, password) => {
    if (!supabase) {
      throw new Error("Authentication is not configured. Please set up Supabase environment variables.");
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      throw error;
    }
  };
  const signUp = async (email, password) => {
    if (!supabase) {
      throw new Error("Authentication is not configured. Please set up Supabase environment variables.");
    }
    const { error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) {
      throw error;
    }
  };
  const signOut = async () => {
    if (!supabase) {
      throw new Error("Authentication is not configured. Please set up Supabase environment variables.");
    }
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };
  const signInWithGitHub = async () => {
    if (!supabase) {
      throw new Error("Authentication is not configured. Please set up Supabase environment variables.");
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) {
      throw error;
    }
  };
  const signInWithGoogle = async () => {
    if (!supabase) {
      throw new Error("Authentication is not configured. Please set up Supabase environment variables.");
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) {
      throw error;
    }
  };
  const resetPassword = async (email) => {
    if (!supabase) {
      throw new Error("Authentication is not configured. Please set up Supabase environment variables.");
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`
    });
    if (error) {
      throw error;
    }
  };
  return /* @__PURE__ */ jsx(
    AuthContext.Provider,
    {
      value: {
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithGitHub,
        signInWithGoogle,
        resetPassword
      },
      children
    }
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const DEFAULT_THEME = "light";
const themeStore = atom(initStore());
function initStore() {
  return DEFAULT_THEME;
}

function stripIndents(arg0, ...values) {
  if (typeof arg0 !== "string") {
    const processedString = arg0.reduce((acc, curr, i) => {
      acc += curr + (values[i] ?? "");
      return acc;
    }, "");
    return _stripIndents(processedString);
  }
  return _stripIndents(arg0);
}
function _stripIndents(value) {
  return value.split("\n").map((line) => line.trim()).join("\n").trimStart().replace(/[\r\n]$/, "");
}

const links = () => [
  {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png"
  },
  { rel: "stylesheet", href: reactToastifyStyles },
  { rel: "stylesheet", href: xtermStyles },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  }
];
const inlineThemeCode = stripIndents`
  setTutorialKitTheme();

  function setTutorialKitTheme() {
    let theme = localStorage.getItem('bolt_theme');

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.querySelector('html')?.setAttribute('data-theme', theme);
  }
`;
const Head = createHead(() => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
  /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
  /* @__PURE__ */ jsx(Meta, {}),
  /* @__PURE__ */ jsx(Links, {}),
  /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: inlineThemeCode } })
] }));
function Layout({ children }) {
  const theme = useStore(themeStore);
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    children,
    /* @__PURE__ */ jsx(ScrollRestoration, {}),
    /* @__PURE__ */ jsx(Scripts, {})
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(DirectionProvider, { dir: "ltr", children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Head,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: 'Module' }));

async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, _loadContext) {
  const readable = await renderToReadableStream(/* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }), {
    signal: request.signal,
    onError(error) {
      console.error(error);
      responseStatusCode = 500;
    }
  });
  const body = new ReadableStream({
    start(controller) {
      const head = renderHeadToString({ request, remixContext, Head });
      controller.enqueue(
        new Uint8Array(
          new TextEncoder().encode(
            `<!DOCTYPE html><html lang="en" data-theme="${themeStore.value}"><head>${head}</head><body><div id="root" class="w-full h-full">`
          )
        )
      );
      const reader = readable.getReader();
      function read() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.enqueue(new Uint8Array(new TextEncoder().encode(`</div></body></html>`)));
            controller.close();
            return;
          }
          controller.enqueue(value);
          read();
        }).catch((error) => {
          controller.error(error);
          readable.cancel();
        });
      }
      read();
    },
    cancel() {
      readable.cancel();
    }
  });
  if (isbot(request.headers.get("user-agent") || "")) {
    await readable.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set("Cross-Origin-Embedder-Policy", "credentialless");
  responseHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: 'Module' }));

async function testSupabaseConnection() {
  try {
    const supabase = createClient();
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();
    if (error) {
      console.log("Supabase connection test - auth error:", error.message);
      return { success: false, error: error.message };
    }
    return {
      success: true,
      message: "Supabase connection successful!",
      session: session ? "User logged in" : "No active session"
    };
  } catch (error) {
    console.error("Supabase connection failed:", error);
    return { success: false, error: error.message };
  }
}

const loader$5 = async ({ request: _request, context: _context }) => {
  try {
    const result = await testSupabaseConnection();
    return json(result);
  } catch (error) {
    return json({ success: false, error: error.message }, { status: 500 });
  }
};

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: 'Module' }));

function createSupabaseServerClient(request, context) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const env = context.env || process.env;
  const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables for server client");
  }
  const headers = new Headers();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        headers.append("Set-Cookie", serialize(key, value, options));
      },
      remove(key, options) {
        headers.append("Set-Cookie", serialize(key, "", options));
      }
    }
  });
  return { supabase, headers };
}

const loader$4 = async ({ request, context }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/";
  if (code) {
    try {
      const { supabase, headers } = createSupabaseServerClient(request, context);
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("Auth callback error:", error);
        return redirect("/?auth_error=callback_failed");
      }
      return redirect(next, { headers });
    } catch (error) {
      console.error("Auth callback exception:", error);
      return redirect("/?auth_error=callback_exception");
    }
  }
  return redirect(next);
};

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: 'Module' }));

const MAX_TOKENS = 8192;
const MAX_RESPONSE_SEGMENTS = 2;

const anthropicConfig = {
  id: "anthropic",
  name: "Anthropic",
  apiKeyEnvVar: "ANTHROPIC_API_KEY",
  models: [
    {
      id: "claude-sonnet-4-5-20250929",
      name: "Claude Sonnet 4.5",
      description: "Best overall coding model with 30+ hour autonomy. State-of-the-art on SWE-bench.",
      provider: "anthropic",
      maxTokens: 8192,
      contextWindow: 2e5,
      capabilities: {
        vision: true,
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 3,
        output: 15
      },
      isDefault: true
    },
    {
      id: "claude-sonnet-4-20250514",
      name: "Claude Sonnet 4",
      description: "Previous generation model, still highly capable for coding tasks.",
      provider: "anthropic",
      maxTokens: 8192,
      contextWindow: 2e5,
      capabilities: {
        vision: true,
        tools: true,
        coding: true
      },
      pricing: {
        input: 3,
        output: 15
      }
    },
    {
      id: "claude-3-5-sonnet-20240620",
      name: "Claude 3.5 Sonnet (Legacy)",
      description: "Legacy model for backward compatibility.",
      provider: "anthropic",
      maxTokens: 8192,
      contextWindow: 2e5,
      capabilities: {
        vision: true,
        tools: true,
        coding: true
      },
      pricing: {
        input: 3,
        output: 15
      }
    }
  ]
};
const anthropicProvider = {
  config: anthropicConfig,
  createModel: (apiKey, modelId) => {
    const anthropic = createAnthropic({ apiKey });
    const selectedModel = modelId || "claude-sonnet-4-5-20250929";
    return anthropic(selectedModel);
  }
};

const deepseekConfig = {
  id: "deepseek",
  name: "DeepSeek",
  apiKeyEnvVar: "DEEPSEEK_API_KEY",
  models: [
    {
      id: "deepseek-chat",
      name: "DeepSeek V3.2",
      description: "Cost-effective model with excellence in math and code. 671B parameters with MoE architecture.",
      provider: "deepseek",
      maxTokens: 8192,
      contextWindow: 64e3,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 0.28,
        output: 0.42,
        cachedInput: 0.028
      },
      isDefault: true
    },
    {
      id: "deepseek-reasoner",
      name: "DeepSeek Reasoner",
      description: "Advanced reasoning model for complex problem-solving.",
      provider: "deepseek",
      maxTokens: 8192,
      contextWindow: 64e3,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 0.55,
        output: 2.19,
        cachedInput: 0.14
      }
    }
  ]
};
const deepseekProvider = {
  config: deepseekConfig,
  createModel: (apiKey, modelId) => {
    const deepseek = createDeepSeek({ apiKey });
    const selectedModel = modelId || "deepseek-chat";
    return deepseek(selectedModel);
  }
};

const googleConfig = {
  id: "google",
  name: "Google",
  apiKeyEnvVar: "GOOGLE_API_KEY",
  models: [
    {
      id: "gemini-2.5-pro",
      name: "Gemini 2.5 Pro",
      description: "#1 on WebDev Arena. Excellent for building interactive web apps with 1M token context.",
      provider: "google",
      maxTokens: 8192,
      contextWindow: 1e6,
      capabilities: {
        vision: true,
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 2.5,
        output: 10
      },
      isDefault: true
    },
    {
      id: "gemini-2.5-flash",
      name: "Gemini 2.5 Flash",
      description: "Fast and cost-effective model for quick coding tasks.",
      provider: "google",
      maxTokens: 8192,
      contextWindow: 1e6,
      capabilities: {
        vision: true,
        tools: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 0.15,
        output: 0.6
      }
    },
    {
      id: "gemini-exp-1206",
      name: "Gemini Experimental",
      description: "Latest experimental model with cutting-edge capabilities.",
      provider: "google",
      maxTokens: 8192,
      contextWindow: 2e6,
      capabilities: {
        vision: true,
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 2.5,
        output: 10
      }
    }
  ]
};
const googleProvider = {
  config: googleConfig,
  createModel: (apiKey, modelId) => {
    const google = createGoogleGenerativeAI({ apiKey });
    const selectedModel = modelId || "gemini-2.5-pro";
    return google(selectedModel);
  }
};

const openaiConfig = {
  id: "openai",
  name: "OpenAI",
  apiKeyEnvVar: "OPENAI_API_KEY",
  models: [
    {
      id: "gpt-5",
      name: "GPT-5",
      description: "Smartest model with built-in thinking. 74.9% on SWE-bench, strongest coding model.",
      provider: "openai",
      maxTokens: 16384,
      contextWindow: 128e3,
      capabilities: {
        vision: true,
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 5,
        output: 15
      },
      isDefault: true
    },
    {
      id: "gpt-4.1",
      name: "GPT-4.1",
      description: "Specialized for coding tasks with precise instruction following and web development.",
      provider: "openai",
      maxTokens: 8192,
      contextWindow: 128e3,
      capabilities: {
        vision: true,
        tools: true,
        coding: true
      },
      pricing: {
        input: 3,
        output: 12
      }
    },
    {
      id: "o3",
      name: "OpenAI o3",
      description: "Advanced reasoning model with 20% fewer errors on difficult real-world tasks.",
      provider: "openai",
      maxTokens: 1e5,
      contextWindow: 128e3,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 10,
        output: 40
      }
    },
    {
      id: "o4-mini",
      name: "OpenAI o4-mini",
      description: "Fast, cost-efficient reasoning model optimized for performance.",
      provider: "openai",
      maxTokens: 65536,
      contextWindow: 128e3,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 1.1,
        output: 4.4
      }
    },
    {
      id: "gpt-4o",
      name: "GPT-4o",
      description: "Multimodal model with strong general capabilities.",
      provider: "openai",
      maxTokens: 16384,
      contextWindow: 128e3,
      capabilities: {
        vision: true,
        tools: true,
        coding: true
      },
      pricing: {
        input: 2.5,
        output: 10
      }
    }
  ]
};
const openaiProvider = {
  config: openaiConfig,
  createModel: (apiKey, modelId) => {
    const openai = createOpenAI({ apiKey });
    const selectedModel = modelId || "gpt-5";
    return openai(selectedModel);
  }
};

const xaiConfig = {
  id: "xai",
  name: "xAI",
  apiKeyEnvVar: "XAI_API_KEY",
  models: [
    {
      id: "grok-code-fast-1",
      name: "Grok Code Fast 1",
      description: "Speedy and economical reasoning model excelling at agentic coding. 70.8% on SWE-Bench.",
      provider: "xai",
      maxTokens: 8192,
      contextWindow: 131072,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 0.2,
        output: 1.5,
        cachedInput: 0.02
      },
      isDefault: true
    },
    {
      id: "grok-3",
      name: "Grok 3",
      description: "Advanced model with significant improvements in reasoning, math, and coding.",
      provider: "xai",
      maxTokens: 8192,
      contextWindow: 131072,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 2,
        output: 10
      }
    },
    {
      id: "grok-4",
      name: "Grok 4",
      description: "Most intelligent Grok model with native tool use and real-time search.",
      provider: "xai",
      maxTokens: 8192,
      contextWindow: 131072,
      capabilities: {
        vision: true,
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 5,
        output: 15
      }
    }
  ]
};
const xaiProvider = {
  config: xaiConfig,
  createModel: (apiKey, modelId) => {
    const xai = createXai({ apiKey });
    const selectedModel = modelId || "grok-code-fast-1";
    return xai(selectedModel);
  }
};

const mistralConfig = {
  id: "mistral",
  name: "Mistral",
  apiKeyEnvVar: "MISTRAL_API_KEY",
  models: [
    {
      id: "codestral-latest",
      name: "Codestral 25.08",
      description: "Optimized for low-latency coding. 2x faster with 80+ programming languages support.",
      provider: "mistral",
      maxTokens: 8192,
      contextWindow: 256e3,
      capabilities: {
        tools: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 0.3,
        output: 0.9
      },
      isDefault: true
    },
    {
      id: "mistral-large-latest",
      name: "Mistral Large",
      description: "General-purpose flagship model with strong coding capabilities.",
      provider: "mistral",
      maxTokens: 8192,
      contextWindow: 128e3,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 2,
        output: 6
      }
    },
    {
      id: "mistral-small-latest",
      name: "Mistral Small",
      description: "Fast and cost-effective model for simple coding tasks.",
      provider: "mistral",
      maxTokens: 8192,
      contextWindow: 32e3,
      capabilities: {
        tools: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 0.2,
        output: 0.6
      }
    }
  ]
};
const mistralProvider = {
  config: mistralConfig,
  createModel: (apiKey, modelId) => {
    const mistral = createMistral({ apiKey });
    const selectedModel = modelId || "codestral-latest";
    return mistral(selectedModel);
  }
};

const zhipuaiConfig = {
  id: "zhipuai",
  name: "ZhipuAI (智谱AI)",
  apiKeyEnvVar: "ZHIPUAI_API_KEY",
  models: [
    {
      id: "glm-5",
      name: "GLM-5",
      description: "Next-gen flagship model for Agentic Engineering. SOTA in coding & agent tasks with 744B parameters.",
      provider: "zhipuai",
      maxTokens: 128e3,
      contextWindow: 2e5,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true,
        fast: false
      },
      pricing: {
        input: 4e-3,
        output: 0.018
      },
      isDefault: true
    },
    {
      id: "glm-4.7",
      name: "GLM-4.7",
      description: "Latest flagship base model with comprehensive upgrades in reasoning, creation, and understanding.",
      provider: "zhipuai",
      maxTokens: 65536,
      contextWindow: 2e5,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 2e-3,
        output: 8e-3
      }
    },
    {
      id: "glm-4.7-flashx",
      name: "GLM-4.7-FlashX",
      description: "Fast and cost-effective version with 200K context window for quick responses.",
      provider: "zhipuai",
      maxTokens: 65536,
      contextWindow: 2e5,
      capabilities: {
        tools: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 5e-4,
        output: 3e-3
      }
    },
    {
      id: "glm-4.7-flash",
      name: "GLM-4.7-Flash",
      description: "Free model with 200K context for development and testing. Best value for experimentation.",
      provider: "zhipuai",
      maxTokens: 65536,
      contextWindow: 2e5,
      capabilities: {
        tools: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 0,
        output: 0
      }
    },
    {
      id: "glm-4.6v",
      name: "GLM-4.6V",
      description: "Multimodal model with vision understanding for images, videos, files, and text.",
      provider: "zhipuai",
      maxTokens: 65536,
      contextWindow: 128e3,
      capabilities: {
        vision: true,
        tools: true,
        coding: true
      },
      pricing: {
        input: 1e-3,
        output: 3e-3
      }
    },
    {
      id: "glm-4.6v-flashx",
      name: "GLM-4.6V-FlashX",
      description: "Fast multimodal model for quick visual understanding tasks.",
      provider: "zhipuai",
      maxTokens: 65536,
      contextWindow: 128e3,
      capabilities: {
        vision: true,
        tools: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 15e-5,
        output: 15e-4
      }
    },
    {
      id: "glm-4.6v-flash",
      name: "GLM-4.6V-Flash",
      description: "Free multimodal model for visual understanding development and testing.",
      provider: "zhipuai",
      maxTokens: 65536,
      contextWindow: 128e3,
      capabilities: {
        vision: true,
        tools: true,
        coding: true,
        fast: true
      },
      pricing: {
        input: 0,
        output: 0
      }
    },
    {
      id: "glm-4-plus",
      name: "GLM-4-Plus",
      description: "Legacy flagship model with enhanced reasoning capabilities.",
      provider: "zhipuai",
      maxTokens: 8192,
      contextWindow: 128e3,
      capabilities: {
        vision: true,
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 0.05,
        output: 0.05
      }
    },
    {
      id: "glm-4-long",
      name: "GLM-4-Long",
      description: "Extended context model supporting up to 1M tokens for long document processing.",
      provider: "zhipuai",
      maxTokens: 8192,
      contextWindow: 1e6,
      capabilities: {
        tools: true,
        coding: true,
        reasoning: true
      },
      pricing: {
        input: 1e-3,
        output: 1e-3
      }
    },
    {
      id: "glm-4-air",
      name: "GLM-4-Air",
      description: "Balanced legacy model offering good performance at competitive pricing.",
      provider: "zhipuai",
      maxTokens: 8192,
      contextWindow: 128e3,
      capabilities: {
        tools: true,
        coding: true
      },
      pricing: {
        input: 5e-4,
        output: 5e-4
      }
    },
    {
      id: "glm-4-airx",
      name: "GLM-4-AirX",
      description: "Legacy model with enhanced reasoning capabilities.",
      provider: "zhipuai",
      maxTokens: 8192,
      contextWindow: 128e3,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true
      },
      pricing: {
        input: 0.01,
        output: 0.01
      }
    },
    {
      id: "glm-4-0520",
      name: "GLM-4-0520",
      description: "Stable legacy release with reliable performance and consistent outputs.",
      provider: "zhipuai",
      maxTokens: 8192,
      contextWindow: 128e3,
      capabilities: {
        vision: true,
        tools: true,
        coding: true
      },
      pricing: {
        input: 0.1,
        output: 0.1
      }
    }
  ]
};
const zhipuaiProvider = {
  config: zhipuaiConfig,
  createModel: (apiKey, modelId) => {
    const zhipuai = createOpenAICompatible({
      name: "zhipuai",
      apiKey,
      baseURL: "https://open.bigmodel.cn/api/paas/v4/"
    });
    const selectedModel = modelId || "glm-5";
    return zhipuai(selectedModel);
  }
};

const PROVIDER_CONFIGS = {
  anthropic: anthropicConfig,
  deepseek: deepseekConfig,
  google: googleConfig,
  openai: openaiConfig,
  xai: xaiConfig,
  mistral: mistralConfig,
  zhipuai: zhipuaiConfig
};
function getProviderModels(provider) {
  return PROVIDER_CONFIGS[provider]?.models || [];
}
function getModel$2(provider, modelId) {
  const models = getProviderModels(provider);
  return models.find((m) => m.id === modelId);
}
function getDefaultModel(provider) {
  const models = getProviderModels(provider);
  return models.find((m) => m.isDefault) || models[0];
}
const DEFAULT_PROVIDER = "zhipuai";
const DEFAULT_MODEL_ID = "glm-5";

const WORK_DIR_NAME = "project";
const WORK_DIR = `/home/${WORK_DIR_NAME}`;
const MODIFICATIONS_TAG_NAME = "bolt_file_modifications";

const allowedHTMLElements = [
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "dd",
  "del",
  "details",
  "div",
  "dl",
  "dt",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "ins",
  "kbd",
  "li",
  "ol",
  "p",
  "pre",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "source",
  "span",
  "strike",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
  "var"
];
({
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...defaultSchema.attributes?.div ?? [], "data*", ["className", "__boltArtifact__"]]
  }});

const getSystemPrompt = (cwd = WORK_DIR) => `
You are Bolt, an expert AI assistant and exceptional senior software developer with vast knowledge across multiple programming languages, frameworks, and best practices.

<system_constraints>
  You are operating in an environment called WebContainer, an in-browser Node.js runtime that emulates a Linux system to some degree. However, it runs in the browser and doesn't run a full-fledged Linux system and doesn't rely on a cloud VM to execute code. All code is executed in the browser. It does come with a shell that emulates zsh. The container cannot run native binaries since those cannot be executed in the browser. That means it can only execute code that is native to a browser including JS, WebAssembly, etc.

  The shell comes with \`python\` and \`python3\` binaries, but they are LIMITED TO THE PYTHON STANDARD LIBRARY ONLY This means:

    - There is NO \`pip\` support! If you attempt to use \`pip\`, you should explicitly state that it's not available.
    - CRITICAL: Third-party libraries cannot be installed or imported.
    - Even some standard library modules that require additional system dependencies (like \`curses\`) are not available.
    - Only modules from the core Python standard library can be used.

  Additionally, there is no \`g++\` or any C/C++ compiler available. WebContainer CANNOT run native binaries or compile C/C++ code!

  Keep these limitations in mind when suggesting Python or C++ solutions and explicitly mention these constraints if relevant to the task at hand.

  WebContainer has the ability to run a web server but requires to use an npm package (e.g., Vite, servor, serve, http-server) or use the Node.js APIs to implement a web server.

  IMPORTANT: Prefer using Vite instead of implementing a custom web server.

  IMPORTANT: Git is NOT available.

  IMPORTANT: Prefer writing Node.js scripts instead of shell scripts. The environment doesn't fully support shell scripts, so use Node.js for scripting tasks whenever possible!

  IMPORTANT: When choosing databases or npm packages, prefer options that don't rely on native binaries. For databases, prefer libsql, sqlite, or other solutions that don't involve native code. WebContainer CANNOT execute arbitrary native binaries.

  Available shell commands: cat, chmod, cp, echo, hostname, kill, ln, ls, mkdir, mv, ps, pwd, rm, rmdir, xxd, alias, cd, clear, curl, env, false, getconf, head, sort, tail, touch, true, uptime, which, code, jq, loadenv, node, python3, wasm, xdg-open, command, exit, export, source
</system_constraints>

<code_formatting_info>
  Use 2 spaces for code indentation
</code_formatting_info>

<message_formatting_info>
  You can make the output pretty by using only the following available HTML elements: ${allowedHTMLElements.map((tagName) => `<${tagName}>`).join(", ")}
</message_formatting_info>

<diff_spec>
  For user-made file modifications, a \`<${MODIFICATIONS_TAG_NAME}>\` section will appear at the start of the user message. It will contain either \`<diff>\` or \`<file>\` elements for each modified file:

    - \`<diff path="/some/file/path.ext">\`: Contains GNU unified diff format changes
    - \`<file path="/some/file/path.ext">\`: Contains the full new content of the file

  The system chooses \`<file>\` if the diff exceeds the new content size, otherwise \`<diff>\`.

  GNU unified diff format structure:

    - For diffs the header with original and modified file names is omitted!
    - Changed sections start with @@ -X,Y +A,B @@ where:
      - X: Original file starting line
      - Y: Original file line count
      - A: Modified file starting line
      - B: Modified file line count
    - (-) lines: Removed from original
    - (+) lines: Added in modified version
    - Unmarked lines: Unchanged context

  Example:

  <${MODIFICATIONS_TAG_NAME}>
    <diff path="/home/project/src/main.js">
      @@ -2,7 +2,10 @@
        return a + b;
      }

      -console.log('Hello, World!');
      +console.log('Hello, Bolt!');
      +
      function greet() {
      -  return 'Greetings!';
      +  return 'Greetings!!';
      }
      +
      +console.log('The End');
    </diff>
    <file path="/home/project/package.json">
      // full file content here
    </file>
  </${MODIFICATIONS_TAG_NAME}>
</diff_spec>

<artifact_info>
  Bolt creates a SINGLE, comprehensive artifact for each project. The artifact contains all necessary steps and components, including:

  - Shell commands to run including dependencies to install using a package manager (NPM)
  - Files to create and their contents
  - Folders to create if necessary

  <artifact_instructions>
    1. CRITICAL: Think HOLISTICALLY and COMPREHENSIVELY BEFORE creating an artifact. This means:

      - Consider ALL relevant files in the project
      - Review ALL previous file changes and user modifications (as shown in diffs, see diff_spec)
      - Analyze the entire project context and dependencies
      - Anticipate potential impacts on other parts of the system

      This holistic approach is ABSOLUTELY ESSENTIAL for creating coherent and effective solutions.

    2. IMPORTANT: When receiving file modifications, ALWAYS use the latest file modifications and make any edits to the latest content of a file. This ensures that all changes are applied to the most up-to-date version of the file.

    3. The current working directory is \`${cwd}\`.

    4. Wrap the content in opening and closing \`<boltArtifact>\` tags. These tags contain more specific \`<boltAction>\` elements.

    5. Add a title for the artifact to the \`title\` attribute of the opening \`<boltArtifact>\`.

    6. Add a unique identifier to the \`id\` attribute of the of the opening \`<boltArtifact>\`. For updates, reuse the prior identifier. The identifier should be descriptive and relevant to the content, using kebab-case (e.g., "example-code-snippet"). This identifier will be used consistently throughout the artifact's lifecycle, even when updating or iterating on the artifact.

    7. Use \`<boltAction>\` tags to define specific actions to perform.

    8. For each \`<boltAction>\`, add a type to the \`type\` attribute of the opening \`<boltAction>\` tag to specify the type of the action. Assign one of the following values to the \`type\` attribute:

      - shell: For running shell commands.

        - When Using \`npx\`, ALWAYS provide the \`--yes\` flag.
        - When running multiple shell commands, use \`&&\` to run them sequentially.
        - ULTRA IMPORTANT: Do NOT re-run a dev command if there is one that starts a dev server and new dependencies were installed or files updated! If a dev server has started already, assume that installing dependencies will be executed in a different process and will be picked up by the dev server.

      - file: For writing new files or updating existing files. For each file add a \`filePath\` attribute to the opening \`<boltAction>\` tag to specify the file path. The content of the file artifact is the file contents. All file paths MUST BE relative to the current working directory.

    9. The order of the actions is VERY IMPORTANT. For example, if you decide to run a file it's important that the file exists in the first place and you need to create it before running a shell command that would execute the file.

    10. ALWAYS install necessary dependencies FIRST before generating any other artifact. If that requires a \`package.json\` then you should create that first!

      IMPORTANT: Add all required dependencies to the \`package.json\` already and try to avoid \`npm i <pkg>\` if possible!

    11. CRITICAL: Always provide the FULL, updated content of the artifact. This means:

      - Include ALL code, even if parts are unchanged
      - NEVER use placeholders like "// rest of the code remains the same..." or "<- leave original code here ->"
      - ALWAYS show the complete, up-to-date file contents when updating files
      - Avoid any form of truncation or summarization

    12. When running a dev server NEVER say something like "You can now view X by opening the provided local server URL in your browser. The preview will be opened automatically or by the user manually!

    13. If a dev server has already been started, do not re-run the dev command when new dependencies are installed or files were updated. Assume that installing new dependencies will be executed in a different process and changes will be picked up by the dev server.

    14. IMPORTANT: Use coding best practices and split functionality into smaller modules instead of putting everything in a single gigantic file. Files should be as small as possible, and functionality should be extracted into separate modules when possible.

      - Ensure code is clean, readable, and maintainable.
      - Adhere to proper naming conventions and consistent formatting.
      - Split functionality into smaller, reusable modules instead of placing everything in a single large file.
      - Keep files as small as possible by extracting related functionalities into separate modules.
      - Use imports to connect these modules together effectively.
  </artifact_instructions>
</artifact_info>

NEVER use the word "artifact". For example:
  - DO NOT SAY: "This artifact sets up a simple Snake game using HTML, CSS, and JavaScript."
  - INSTEAD SAY: "We set up a simple Snake game using HTML, CSS, and JavaScript."

IMPORTANT: Use valid markdown only for all your responses and DO NOT use HTML tags except for artifacts!

ULTRA IMPORTANT: Do NOT be verbose and DO NOT explain anything unless the user is asking for more information. That is VERY important.

ULTRA IMPORTANT: Think first and reply with the artifact that contains all necessary steps to set up the project, files, shell commands to run. It is SUPER IMPORTANT to respond with this first.

Here are some examples of correct usage of artifacts:

<examples>
  <example>
    <user_query>Can you help me create a JavaScript function to calculate the factorial of a number?</user_query>

    <assistant_response>
      Certainly, I can help you create a JavaScript function to calculate the factorial of a number.

      <boltArtifact id="factorial-function" title="JavaScript Factorial Function">
        <boltAction type="file" filePath="index.js">
          function factorial(n) {
           ...
          }

          ...
        </boltAction>

        <boltAction type="shell">
          node index.js
        </boltAction>
      </boltArtifact>
    </assistant_response>
  </example>

  <example>
    <user_query>Build a snake game</user_query>

    <assistant_response>
      Certainly! I'd be happy to help you build a snake game using JavaScript and HTML5 Canvas. This will be a basic implementation that you can later expand upon. Let's create the game step by step.

      <boltArtifact id="snake-game" title="Snake Game in HTML and JavaScript">
        <boltAction type="file" filePath="package.json">
          {
            "name": "snake",
            "scripts": {
              "dev": "vite"
            }
            ...
          }
        </boltAction>

        <boltAction type="shell">
          npm install --save-dev vite
        </boltAction>

        <boltAction type="file" filePath="index.html">
          ...
        </boltAction>

        <boltAction type="shell">
          npm run dev
        </boltAction>
      </boltArtifact>

      Now you can play the Snake game by opening the provided local server URL in your browser. Use the arrow keys to control the snake. Eat the red food to grow and increase your score. The game ends if you hit the wall or your own tail.
    </assistant_response>
  </example>

  <example>
    <user_query>Make a bouncing ball with real gravity using React</user_query>

    <assistant_response>
      Certainly! I'll create a bouncing ball with real gravity using React. We'll use the react-spring library for physics-based animations.

      <boltArtifact id="bouncing-ball-react" title="Bouncing Ball with Gravity in React">
        <boltAction type="file" filePath="package.json">
          {
            "name": "bouncing-ball",
            "private": true,
            "version": "0.0.0",
            "type": "module",
            "scripts": {
              "dev": "vite",
              "build": "vite build",
              "preview": "vite preview"
            },
            "dependencies": {
              "react": "^18.2.0",
              "react-dom": "^18.2.0",
              "react-spring": "^9.7.1"
            },
            "devDependencies": {
              "@types/react": "^18.0.28",
              "@types/react-dom": "^18.0.11",
              "@vitejs/plugin-react": "^3.1.0",
              "vite": "^4.2.0"
            }
          }
        </boltAction>

        <boltAction type="file" filePath="index.html">
          ...
        </boltAction>

        <boltAction type="file" filePath="src/main.jsx">
          ...
        </boltAction>

        <boltAction type="file" filePath="src/index.css">
          ...
        </boltAction>

        <boltAction type="file" filePath="src/App.jsx">
          ...
        </boltAction>

        <boltAction type="shell">
          npm run dev
        </boltAction>
      </boltArtifact>

      You can now view the bouncing ball animation in the preview. The ball will start falling from the top of the screen and bounce realistically when it hits the bottom.
    </assistant_response>
  </example>
</examples>
`;
const CONTINUE_PROMPT = stripIndents`
  Continue your prior response. IMPORTANT: Immediately begin from where you left off without any interruptions.
  Do not repeat any content, including artifact and action tags.
`;

const PROVIDERS$1 = {
  anthropic: anthropicProvider,
  deepseek: deepseekProvider,
  google: googleProvider,
  openai: openaiProvider,
  xai: xaiProvider,
  mistral: mistralProvider,
  zhipuai: zhipuaiProvider
};
function getProviderApiKey(provider, env) {
  const providerConfig = PROVIDERS$1[provider]?.config;
  if (!providerConfig) {
    return void 0;
  }
  const envVar = providerConfig.apiKeyEnvVar;
  return env[envVar] || process.env[envVar];
}
function createModel(provider = DEFAULT_PROVIDER, modelId, env) {
  const providerImpl = PROVIDERS$1[provider];
  if (!providerImpl) {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  const apiKey = env ? getProviderApiKey(provider, env) : void 0;
  if (!apiKey) {
    throw new Error(
      `Missing API key for provider ${provider}. Please set ${providerImpl.config.apiKeyEnvVar} in your environment.`
    );
  }
  if (modelId) {
    const modelInfo = getModel$2(provider, modelId);
    if (!modelInfo) {
      console.warn(`Model ${modelId} not found for provider ${provider}. Using default.`);
      modelId = void 0;
    }
  }
  return providerImpl.createModel(apiKey, modelId);
}
function getDefaultModelInstance(env) {
  return createModel(DEFAULT_PROVIDER, DEFAULT_MODEL_ID, env);
}

function getModel$1(env, provider, modelId) {
  if (!provider) {
    return getDefaultModelInstance(env);
  }
  return createModel(provider, modelId, env);
}

function streamText(messages, env, options) {
  const { provider, modelId, fullModelId, ...streamOptions } = options || {};
  let selectedProvider = provider;
  let selectedModelId = modelId;
  if (fullModelId) {
    const [p, m] = fullModelId.split(":");
    selectedProvider = p;
    selectedModelId = m;
    console.log(`[streamText] Parsed fullModelId: ${fullModelId} -> provider: ${p}, modelId: ${m}`);
  }
  const resolvedProvider = selectedProvider ?? DEFAULT_PROVIDER;
  const resolvedModelId = selectedModelId ?? getDefaultModel(resolvedProvider)?.id ?? (resolvedProvider === DEFAULT_PROVIDER ? DEFAULT_MODEL_ID : void 0);
  console.log(`[streamText] Using provider: ${resolvedProvider}, modelId: ${resolvedModelId}`);
  const model = getModel$1(env, resolvedProvider, resolvedModelId);
  const modelInfo = resolvedModelId ? getModel$2(resolvedProvider, resolvedModelId) : void 0;
  const headers = {};
  if (resolvedProvider === "anthropic") {
    headers["anthropic-beta"] = "max-tokens-3-5-sonnet-2024-07-15";
  }
  const maxTokens = modelInfo?.maxTokens || MAX_TOKENS;
  return streamText$1({
    model,
    system: getSystemPrompt(),
    maxOutputTokens: maxTokens,
    headers,
    messages,
    ...streamOptions
  });
}

async function action$1(args) {
  return enhancerAction(args);
}
async function enhancerAction({ context, request }) {
  const body = await request.json();
  const { message } = body;
  const fullModelId = body?.model;
  const enhancerMessages = [
    {
      role: "user",
      content: stripIndents`
        I want you to improve the user prompt that is wrapped in \`<original_prompt>\` tags.

        IMPORTANT: Only respond with the improved prompt and nothing else!

        <original_prompt>
          ${message}
        </original_prompt>
      `
    }
  ];
  try {
    const result = await streamText(enhancerMessages, context.cloudflare.env, {
      fullModelId
      // pass model selection to streamText
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("Missing API key")) {
      if (fullModelId) {
        console.log(`API key missing for selected model, falling back to default model`);
        try {
          const result = await streamText(enhancerMessages, context.cloudflare.env, {
            // don't specify fullModelId to use default
          });
          return result.toTextStreamResponse();
        } catch (fallbackError) {
          console.error("Fallback to default model also failed:", fallbackError);
        }
      }
      throw new Response(errorMessage, {
        status: 401,
        statusText: "API Key Missing"
      });
    }
    throw new Response(null, {
      status: 500,
      statusText: "Internal Server Error"
    });
  }
}

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: 'Module' }));

const loader$3 = async ({ request }) => {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get("url");
  if (!imageUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }
  const allowedDomains = ["lh3.googleusercontent.com", "avatars.githubusercontent.com", "ui-avatars.com"];
  let parsedUrl;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }
  const isAllowed = allowedDomains.some(
    (domain) => parsedUrl.hostname === domain || parsedUrl.hostname.endsWith("." + domain)
  );
  if (!isAllowed) {
    return new Response("Domain not allowed", { status: 403 });
  }
  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Bolt.new Avatar Proxy"
      }
    });
    if (!response.ok) {
      return new Response("Failed to fetch image", { status: response.status });
    }
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const imageData = await response.arrayBuffer();
    return new Response(imageData, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
        // cache for 1 hour
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Avatar proxy error:", error);
    return new Response("Error fetching image", { status: 500 });
  }
};

const route4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  loader: loader$3
}, Symbol.toStringTag, { value: 'Module' }));

class SwitchableStream extends TransformStream {
  _controller = null;
  _currentReader = null;
  _switches = 0;
  constructor() {
    let controllerRef;
    super({
      start(controller) {
        controllerRef = controller;
      }
    });
    if (controllerRef === void 0) {
      throw new Error("Controller not properly initialized");
    }
    this._controller = controllerRef;
  }
  async switchSource(newStream) {
    if (this._currentReader) {
      await this._currentReader.cancel();
    }
    this._currentReader = newStream.getReader();
    this._pumpStream();
    this._switches++;
  }
  async _pumpStream() {
    if (!this._currentReader || !this._controller) {
      throw new Error("Stream is not properly initialized");
    }
    try {
      while (true) {
        const { done, value } = await this._currentReader.read();
        if (done) {
          break;
        }
        this._controller.enqueue(value);
      }
    } catch (error) {
      console.log(error);
      this._controller.error(error);
    }
  }
  close() {
    if (this._currentReader) {
      this._currentReader.cancel();
    }
    this._controller?.terminate();
  }
  get switches() {
    return this._switches;
  }
}

const SERVER_FALLBACK_ORDER = [
  "zhipuai",
  // Default (free tier available)
  "deepseek",
  // Very affordable
  "mistral",
  // Good balance
  "google",
  // Large context
  "openai",
  // High quality
  "anthropic",
  // Premium
  "xai"
  // Alternative
];
function isProviderAvailableOnServer(provider, env) {
  const apiKey = getProviderApiKey(provider, env);
  return !!apiKey && apiKey.trim() !== "";
}
function getFirstAvailableProviderOnServer(preferences, env) {
  for (const provider of preferences) {
    if (isProviderAvailableOnServer(provider, env)) {
      return provider;
    }
  }
  return void 0;
}
function getBestAvailableProviderOnServer(env) {
  return getFirstAvailableProviderOnServer(SERVER_FALLBACK_ORDER, env);
}

async function loader$2() {
  return new Response("This endpoint only accepts POST requests", {
    status: 405,
    statusText: "Method Not Allowed",
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
async function action(args) {
  return chatAction(args);
}
function uiToModelMessages(uiMessages) {
  return uiMessages.filter((m) => m.role === "user" || m.role === "assistant").map((m) => {
    const text = Array.isArray(m.parts) ? m.parts.filter((p) => p?.type === "text" && typeof p.text === "string").map((p) => p.text).join("") : m.content ?? "";
    return { role: m.role, content: text };
  });
}
async function chatAction({ context, request }) {
  const body = await request.json();
  const uiMessages = body?.messages ?? [];
  const messages = uiToModelMessages(uiMessages);
  let fullModelId = body?.model;
  console.log(`[api.chat] Received model from request body: ${fullModelId}`);
  if (fullModelId) {
    const [provider] = fullModelId.split(":");
    if (!isProviderAvailableOnServer(provider, context.cloudflare.env)) {
      console.warn(`[api.chat] Provider ${provider} is not available (no API key). Falling back to best available provider.`);
      const fallbackProvider = getBestAvailableProviderOnServer(context.cloudflare.env);
      if (fallbackProvider) {
        const fallbackModel = getDefaultModel(fallbackProvider);
        if (fallbackModel) {
          fullModelId = `${fallbackProvider}:${fallbackModel.id}`;
          console.log(`[api.chat] Using fallback model: ${fullModelId}`);
        }
      }
    }
  } else {
    const fallbackProvider = getBestAvailableProviderOnServer(context.cloudflare.env);
    if (fallbackProvider) {
      const fallbackModel = getDefaultModel(fallbackProvider);
      if (fallbackModel) {
        fullModelId = `${fallbackProvider}:${fallbackModel.id}`;
        console.log(`[api.chat] No model specified, using: ${fullModelId}`);
      }
    }
  }
  const stream = new SwitchableStream();
  const createOnFinishHandler = (streamOptions) => {
    return async ({ text: content, finishReason }) => {
      if (finishReason !== "length") {
        return stream.close();
      }
      if (stream.switches >= MAX_RESPONSE_SEGMENTS) {
        throw Error("Cannot continue message: Maximum segments reached");
      }
      const switchesLeft = MAX_RESPONSE_SEGMENTS - stream.switches;
      console.log(`Reached max token limit (${MAX_TOKENS}): Continuing message (${switchesLeft} switches left)`);
      messages.push({ role: "assistant", content });
      messages.push({ role: "user", content: CONTINUE_PROMPT });
      const continued = await streamText(messages, context.cloudflare.env, streamOptions);
      const continuedResp = continued.toUIMessageStreamResponse({ sendStart: false });
      return stream.switchSource(continuedResp.body);
    };
  };
  try {
    const options = {
      toolChoice: "none",
      fullModelId
      // pass model selection to streamText
    };
    options.onFinish = createOnFinishHandler(options);
    const result = await streamText(messages, context.cloudflare.env, options);
    const resp = result.toUIMessageStreamResponse({ sendFinish: false });
    await stream.switchSource(resp.body);
    return new Response(stream.readable, {
      status: 200,
      headers: {
        contentType: "text/plain; charset=utf-8"
      }
    });
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("Missing API key")) {
      if (fullModelId) {
        console.log(`API key missing for selected model, falling back to default model`);
        try {
          const fallbackOptions = {
            toolChoice: "none"
            // don't specify fullModelId to use default
          };
          fallbackOptions.onFinish = createOnFinishHandler(fallbackOptions);
          const result = await streamText(messages, context.cloudflare.env, fallbackOptions);
          const resp = result.toUIMessageStreamResponse({ sendFinish: false });
          await stream.switchSource(resp.body);
          return new Response(stream.readable, {
            status: 200,
            headers: {
              contentType: "text/plain; charset=utf-8"
            }
          });
        } catch (fallbackError) {
          console.error("Fallback to default model also failed:", fallbackError);
        }
      }
      throw new Response(errorMessage, {
        status: 401,
        statusText: "API Key Missing"
      });
    }
    throw new Response(null, {
      status: 500,
      statusText: "Internal Server Error"
    });
  }
}

const route5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action,
  loader: loader$2
}, Symbol.toStringTag, { value: 'Module' }));

const BaseChat$1 = "_";
const Chat$1 = "a";
const styles = {
	BaseChat: BaseChat$1,
	Chat: Chat$1
};

const Messages = undefined;

const PROVIDERS = undefined;
const getModel = undefined;

let currentLevel = "debug" ;
const isWorker = "HTMLRewriter" in globalThis;
const supportsColor = !isWorker;
function createScopedLogger(scope) {
  return {
    trace: (...messages) => log("trace", scope, messages),
    debug: (...messages) => log("debug", scope, messages),
    info: (...messages) => log("info", scope, messages),
    warn: (...messages) => log("warn", scope, messages),
    error: (...messages) => log("error", scope, messages),
    setLevel
  };
}
function setLevel(level) {
  if ((level === "trace" || level === "debug") && true) {
    return;
  }
  currentLevel = level;
}
function formatMessage(message) {
  if (typeof message === "string") {
    return message;
  }
  if (message instanceof Error) {
    return message.stack ?? message.message ?? "Error";
  }
  if (message === null || message === void 0) {
    return String(message);
  }
  if (typeof message === "number" || typeof message === "boolean" || typeof message === "bigint") {
    return message.toString();
  }
  if (typeof message === "symbol") {
    return message.description ? `Symbol(${message.description})` : message.toString();
  }
  if (typeof message === "object") {
    try {
      return JSON.stringify(message);
    } catch (error) {
      return Object.prototype.toString.call(message);
    }
  }
  return String(message);
}
function log(level, scope, messages) {
  const levelOrder = ["trace", "debug", "info", "warn", "error"];
  if (levelOrder.indexOf(level) < levelOrder.indexOf(currentLevel)) {
    return;
  }
  const allMessages = messages.reduce((acc, current) => {
    const formatted = formatMessage(current);
    if (acc.endsWith("\n")) {
      return acc + formatted;
    }
    if (!acc) {
      return formatted;
    }
    return `${acc} ${formatted}`;
  }, "");
  if (!supportsColor) {
    console.log(`[${level.toUpperCase()}]`, allMessages);
    return;
  }
  const labelBackgroundColor = getColorForLevel(level);
  const labelTextColor = level === "warn" ? "black" : "white";
  const labelStyles = getLabelStyles(labelBackgroundColor, labelTextColor);
  const scopeStyles = getLabelStyles("#77828D", "white");
  const styles = [labelStyles];
  if (typeof scope === "string") {
    styles.push("", scopeStyles);
  }
  console.log(`%c${level.toUpperCase()}${scope ? `%c %c${scope}` : ""}`, ...styles, allMessages);
}
function getLabelStyles(color, textColor) {
  return `background-color: ${color}; color: white; border: 4px solid ${color}; color: ${textColor};`;
}
function getColorForLevel(level) {
  switch (level) {
    case "trace":
    case "debug": {
      return "#77828D";
    }
    case "info": {
      return "#1389FD";
    }
    case "warn": {
      return "#FFDB6C";
    }
    case "error": {
      return "#EE4744";
    }
    default: {
      return "black";
    }
  }
}

const logger$4 = createScopedLogger("ChatHistory");
async function openDatabase() {
  return new Promise((resolve) => {
    const request = indexedDB.open("boltHistory", 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("chats")) {
        const store = db.createObjectStore("chats", { keyPath: "id" });
        store.createIndex("id", "id", { unique: true });
        store.createIndex("urlId", "urlId", { unique: true });
      }
    };
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      resolve(void 0);
      logger$4.error(event.target.error);
    };
  });
}
async function getAll(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("chats", "readonly");
    const store = transaction.objectStore("chats");
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const connectionStore = map({
  status: "indexeddb",
  syncing: false,
  lastSyncTime: null,
  error: null
});
function setConnected(userId) {
  if (userId) {
    connectionStore.setKey("status", "supabase");
  } else {
    connectionStore.setKey("status", "indexeddb");
  }
}

const currentModel = atom({
  provider: "zhipuai",
  modelId: "glm-5",
  fullId: "zhipuai:glm-5"
});
const chatModels = map({});
function setCurrentModel(provider, modelId) {
  const fullId = `${provider}:${modelId}`;
  currentModel.set({
    provider,
    modelId,
    fullId
  });
}
function setChatModel(chatId, provider, modelId) {
  const fullId = `${provider}:${modelId}`;
  chatModels.setKey(chatId, {
    provider,
    modelId,
    fullId
  });
}

class EditorStore {
  #filesStore;
  selectedFile = atom();
  documents = map({});
  currentDocument = computed([this.documents, this.selectedFile], (documents, selectedFile) => {
    if (!selectedFile) {
      return void 0;
    }
    return documents[selectedFile];
  });
  constructor(filesStore) {
    this.#filesStore = filesStore;
  }
  setDocuments(files) {
    const previousDocuments = this.documents.value;
    this.documents.set(
      Object.fromEntries(
        Object.entries(files).map(([filePath, dirent]) => {
          if (dirent === void 0 || dirent.type === "folder") {
            return void 0;
          }
          const previousDocument = previousDocuments?.[filePath];
          return [
            filePath,
            {
              value: dirent.content,
              filePath,
              scroll: previousDocument?.scroll
            }
          ];
        }).filter(Boolean)
      )
    );
  }
  setSelectedFile(filePath) {
    this.selectedFile.set(filePath);
  }
  updateScrollPosition(filePath, position) {
    const documents = this.documents.get();
    const documentState = documents[filePath];
    if (!documentState) {
      return;
    }
    this.documents.setKey(filePath, {
      ...documentState,
      scroll: position
    });
  }
  updateFile(filePath, newContent) {
    const documents = this.documents.get();
    const documentState = documents[filePath];
    if (!documentState) {
      return;
    }
    const currentContent = documentState.value;
    const contentChanged = currentContent !== newContent;
    if (contentChanged) {
      this.documents.setKey(filePath, {
        ...documentState,
        value: newContent
      });
    }
  }
}

/* eslint no-use-before-define:0 */
/**
 * Get the encoding of a buffer.
 * Checks the start, middle, and end of the buffer for characters that are unrecognized within UTF8 encoding.
 * History has shown that inspection at all three locations is necessary.
 * @returns Will be `null` if `buffer` was not provided. Otherwise will be either `'utf8'` or `'binary'`
 */
function getEncoding(buffer, opts) {
    var _a, _b;
    // Check
    if (!buffer)
        return null;
    // Prepare
    const textEncoding = 'utf8';
    const binaryEncoding = 'binary';
    const chunkLength = (_a = opts === null || opts === void 0 ? void 0 : opts.chunkLength) !== null && _a !== void 0 ? _a : 24;
    let chunkBegin = (_b = opts === null || opts === void 0 ? void 0 : opts.chunkBegin) !== null && _b !== void 0 ? _b : 0;
    // Discover
    if ((opts === null || opts === void 0 ? void 0 : opts.chunkBegin) == null) {
        // Start
        let encoding = getEncoding(buffer, { chunkLength, chunkBegin });
        if (encoding === textEncoding) {
            // Middle
            chunkBegin = Math.max(0, Math.floor(buffer.length / 2) - chunkLength);
            encoding = getEncoding(buffer, {
                chunkLength,
                chunkBegin,
            });
            if (encoding === textEncoding) {
                // End
                chunkBegin = Math.max(0, buffer.length - chunkLength);
                encoding = getEncoding(buffer, {
                    chunkLength,
                    chunkBegin,
                });
            }
        }
        // Return
        return encoding;
    }
    else {
        // Extract
        chunkBegin = getChunkBegin(buffer, chunkBegin);
        if (chunkBegin === -1) {
            return binaryEncoding;
        }
        const chunkEnd = getChunkEnd(buffer, Math.min(buffer.length, chunkBegin + chunkLength));
        if (chunkEnd > buffer.length) {
            return binaryEncoding;
        }
        const contentChunkUTF8 = buffer.toString(textEncoding, chunkBegin, chunkEnd);
        // Detect encoding
        for (let i = 0; i < contentChunkUTF8.length; ++i) {
            const charCode = contentChunkUTF8.charCodeAt(i);
            if (charCode === 65533 || charCode <= 8) {
                // 8 and below are control characters (e.g. backspace, null, eof, etc.)
                // 65533 is the unknown character
                // console.log(charCode, contentChunkUTF8[i])
                return binaryEncoding;
            }
        }
        // Return
        return textEncoding;
    }
}
// ====================================
// The functions below are created to handle multibyte utf8 characters.
// To understand how the encoding works, check this article: https://en.wikipedia.org/wiki/UTF-8#Encoding
// @todo add documentation for these
function getChunkBegin(buf, chunkBegin) {
    // If it's the beginning, just return.
    if (chunkBegin === 0) {
        return 0;
    }
    if (!isLaterByteOfUtf8(buf[chunkBegin])) {
        return chunkBegin;
    }
    let begin = chunkBegin - 3;
    if (begin >= 0) {
        if (isFirstByteOf4ByteChar(buf[begin])) {
            return begin;
        }
    }
    begin = chunkBegin - 2;
    if (begin >= 0) {
        if (isFirstByteOf4ByteChar(buf[begin]) ||
            isFirstByteOf3ByteChar(buf[begin])) {
            return begin;
        }
    }
    begin = chunkBegin - 1;
    if (begin >= 0) {
        // Is it a 4-byte, 3-byte utf8 character?
        if (isFirstByteOf4ByteChar(buf[begin]) ||
            isFirstByteOf3ByteChar(buf[begin]) ||
            isFirstByteOf2ByteChar(buf[begin])) {
            return begin;
        }
    }
    return -1;
}
function getChunkEnd(buf, chunkEnd) {
    // If it's the end, just return.
    if (chunkEnd === buf.length) {
        return chunkEnd;
    }
    let index = chunkEnd - 3;
    if (index >= 0) {
        if (isFirstByteOf4ByteChar(buf[index])) {
            return chunkEnd + 1;
        }
    }
    index = chunkEnd - 2;
    if (index >= 0) {
        if (isFirstByteOf4ByteChar(buf[index])) {
            return chunkEnd + 2;
        }
        if (isFirstByteOf3ByteChar(buf[index])) {
            return chunkEnd + 1;
        }
    }
    index = chunkEnd - 1;
    if (index >= 0) {
        if (isFirstByteOf4ByteChar(buf[index])) {
            return chunkEnd + 3;
        }
        if (isFirstByteOf3ByteChar(buf[index])) {
            return chunkEnd + 2;
        }
        if (isFirstByteOf2ByteChar(buf[index])) {
            return chunkEnd + 1;
        }
    }
    return chunkEnd;
}
function isFirstByteOf4ByteChar(byte) {
    // eslint-disable-next-line no-bitwise
    return byte >> 3 === 30; // 11110xxx?
}
function isFirstByteOf3ByteChar(byte) {
    // eslint-disable-next-line no-bitwise
    return byte >> 4 === 14; // 1110xxxx?
}
function isFirstByteOf2ByteChar(byte) {
    // eslint-disable-next-line no-bitwise
    return byte >> 5 === 6; // 110xxxxx?
}
function isLaterByteOfUtf8(byte) {
    // eslint-disable-next-line no-bitwise
    return byte >> 6 === 2; // 10xxxxxx?
}

function computeFileModifications(files, modifiedFiles) {
  const modifications = {};
  let hasModifiedFiles = false;
  for (const [filePath, originalContent] of modifiedFiles) {
    const file = files[filePath];
    if (file?.type !== "file") {
      continue;
    }
    const unifiedDiff = diffFiles(filePath, originalContent, file.content);
    if (!unifiedDiff) {
      continue;
    }
    hasModifiedFiles = true;
    if (unifiedDiff.length > file.content.length) {
      modifications[filePath] = { type: "file", content: file.content };
    } else {
      modifications[filePath] = { type: "diff", content: unifiedDiff };
    }
  }
  if (!hasModifiedFiles) {
    return void 0;
  }
  return modifications;
}
function diffFiles(fileName, oldFileContent, newFileContent) {
  let unifiedDiff = createTwoFilesPatch(fileName, fileName, oldFileContent, newFileContent);
  const patchHeaderEnd = `--- ${fileName}
+++ ${fileName}
`;
  const headerEndIndex = unifiedDiff.indexOf(patchHeaderEnd);
  if (headerEndIndex >= 0) {
    unifiedDiff = unifiedDiff.slice(headerEndIndex + patchHeaderEnd.length);
  }
  if (unifiedDiff === "") {
    return void 0;
  }
  return unifiedDiff;
}

function unreachable(message) {
  throw new Error(`Unreachable: ${message}`);
}

const logger$3 = createScopedLogger("FilesStore");
const utf8TextDecoder = new TextDecoder("utf8", { fatal: true });
class FilesStore {
  #webcontainer;
  /**
   * Tracks the number of files without folders.
   */
  #size = 0;
  /**
   * @note Keeps track all modified files with their original content since the last user message.
   * Needs to be reset when the user sends another message and all changes have to be submitted
   * for the model to be aware of the changes.
   */
  #modifiedFiles = /* @__PURE__ */ new Map();
  /**
   * Map of files that matches the state of WebContainer.
   */
  files = map({});
  get filesCount() {
    return this.#size;
  }
  constructor(webcontainerPromise) {
    this.#webcontainer = webcontainerPromise;
    this.#init();
  }
  getFile(filePath) {
    const dirent = this.files.get()[filePath];
    if (dirent?.type !== "file") {
      return void 0;
    }
    return dirent;
  }
  getFileModifications() {
    return computeFileModifications(this.files.get(), this.#modifiedFiles);
  }
  resetFileModifications() {
    this.#modifiedFiles.clear();
  }
  async saveFile(filePath, content) {
    const webcontainer = await this.#webcontainer;
    try {
      const relativePath = nodePath.relative(webcontainer.workdir, filePath);
      if (!relativePath) {
        throw new Error(`EINVAL: invalid file path, write '${relativePath}'`);
      }
      const oldContent = this.getFile(filePath)?.content;
      if (!oldContent) {
        unreachable("Expected content to be defined");
      }
      await webcontainer.fs.writeFile(relativePath, content);
      if (!this.#modifiedFiles.has(filePath)) {
        this.#modifiedFiles.set(filePath, oldContent);
      }
      this.files.setKey(filePath, { type: "file", content, isBinary: false });
      logger$3.info("File updated");
    } catch (error) {
      logger$3.error("Failed to update file content\n\n", error);
      throw error;
    }
  }
  async #init() {
    const webcontainer = await this.#webcontainer;
    logger$3.info(`Initializing file watcher for ${WORK_DIR}`);
    await this.#refreshAllFiles();
    webcontainer.fs.watch(".", { recursive: true }, (event, filename) => {
      logger$3.debug(`File system change detected: ${event} ${filename || ""}`);
      clearTimeout(this._watchTimeout);
      this._watchTimeout = setTimeout(() => {
        logger$3.debug("Refreshing all files...");
        this.#refreshAllFiles().catch((e) => logger$3.error("Failed to refresh files", e));
      }, 100);
    });
    logger$3.info("File watcher initialized successfully");
  }
  async #refreshAllFiles() {
    const webcontainer = await this.#webcontainer;
    try {
      logger$3.debug("Exporting file tree from WebContainer...");
      const tree = await webcontainer.export(".", { format: "json" });
      const newMap = {};
      let size = 0;
      const walk = async (prefix, node) => {
        if (!node) {
          logger$3.debug(`Walk: node is null/undefined for prefix ${prefix}`);
          return;
        }
        const entries = Object.entries(node);
        logger$3.debug(`Walk: processing ${entries.length} entries at ${prefix}`);
        for (const [name, entry] of entries) {
          const fullPath = `${prefix}/${name}`.replace(/\\/g, "/");
          if (entry && typeof entry === "object" && "directory" in entry) {
            logger$3.debug(`Found folder: ${fullPath}`);
            newMap[fullPath] = { type: "folder" };
            await walk(fullPath, entry.directory);
          } else if (entry && typeof entry === "object" && "file" in entry) {
            const fileEntry = entry.file;
            if ("symlink" in fileEntry && typeof fileEntry.symlink === "string") {
              logger$3.debug(`Skipping symlink: ${fullPath} -> ${fileEntry.symlink}`);
              continue;
            }
            const contents = fileEntry.contents;
            if (typeof contents === "string") {
              logger$3.debug(`Found file: ${fullPath} (text)`);
              newMap[fullPath] = { type: "file", content: contents, isBinary: false };
              size++;
              continue;
            }
            if (contents instanceof Uint8Array) {
              const isBinary = getEncoding(convertToBuffer(contents), { chunkLength: 100 }) === "binary";
              const content = !isBinary ? this.#decodeFileContent(contents) : "";
              logger$3.debug(`Found file: ${fullPath} (${isBinary ? "binary" : "text"})`);
              newMap[fullPath] = { type: "file", content, isBinary };
              size++;
              continue;
            }
            logger$3.warn(`File entry without readable contents skipped: ${fullPath}`);
          }
        }
      };
      const rootContent = tree.directory || tree;
      logger$3.debug("Root content type:", typeof rootContent, "keys:", Object.keys(rootContent || {}));
      await walk(WORK_DIR, rootContent);
      logger$3.debug(`Setting ${size} files to store, map keys:`, Object.keys(newMap));
      this.files.set(newMap);
      this.#size = size;
      logger$3.info(`Refreshed ${size} files`);
    } catch (error) {
      logger$3.error("Error refreshing files:", error);
    }
  }
  #decodeFileContent(buffer) {
    if (!buffer || buffer.byteLength === 0) {
      return "";
    }
    try {
      return utf8TextDecoder.decode(buffer);
    } catch (error) {
      console.log(error);
      return "";
    }
  }
}
function convertToBuffer(view) {
  const buffer = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  Object.setPrototypeOf(buffer, Buffer.prototype);
  return buffer;
}

class PreviewsStore {
  #availablePreviews = /* @__PURE__ */ new Map();
  #webcontainer;
  previews = atom([]);
  constructor(webcontainerPromise) {
    this.#webcontainer = webcontainerPromise;
    this.#init();
  }
  async #init() {
    const webcontainer = await this.#webcontainer;
    webcontainer.on("port", (port, type, url) => {
      let previewInfo = this.#availablePreviews.get(port);
      if (type === "close" && previewInfo) {
        this.#availablePreviews.delete(port);
        this.previews.set(this.previews.get().filter((preview) => preview.port !== port));
        return;
      }
      const previews = this.previews.get();
      if (!previewInfo) {
        previewInfo = { port, ready: type === "open", baseUrl: url };
        this.#availablePreviews.set(port, previewInfo);
        previews.push(previewInfo);
      }
      previewInfo.ready = type === "open";
      previewInfo.baseUrl = url;
      this.previews.set([...previews]);
    });
  }
}

function withResolvers() {
  if (typeof Promise.withResolvers === "function") {
    return Promise.withResolvers();
  }
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    resolve,
    reject,
    promise
  };
}

async function newShellProcess(webcontainer, terminal) {
  const args = [];
  const process = await webcontainer.spawn("/bin/jsh", ["--osc", ...args], {
    terminal: {
      cols: terminal.cols ?? 80,
      rows: terminal.rows ?? 15
    }
  });
  const input = process.input.getWriter();
  const output = process.output;
  const jshReady = withResolvers();
  let isInteractive = false;
  output.pipeTo(
    new WritableStream({
      write(data) {
        if (!isInteractive) {
          const [, osc] = data.match(/\x1b\]654;([^\x07]+)\x07/) || [];
          if (osc === "interactive") {
            isInteractive = true;
            jshReady.resolve();
          }
        }
        terminal.write(data);
      }
    })
  );
  terminal.onData((data) => {
    if (isInteractive) {
      input.write(data);
    }
  });
  await jshReady.promise;
  return process;
}

const reset = "\x1B[0m";
const escapeCodes = {
  red: "\x1B[1;31m"
};
const coloredText = {
  red: (text) => `${escapeCodes.red}${text}${reset}`
};

class TerminalStore {
  #webcontainer;
  #terminals = [];
  showTerminal = atom(false);
  constructor(webcontainerPromise) {
    this.#webcontainer = webcontainerPromise;
  }
  toggleTerminal(value) {
    this.showTerminal.set(value !== void 0 ? value : !this.showTerminal.get());
  }
  async attachTerminal(terminal) {
    try {
      const shellProcess = await newShellProcess(await this.#webcontainer, terminal);
      this.#terminals.push({ terminal, process: shellProcess });
    } catch (error) {
      terminal.write(coloredText.red("Failed to spawn shell\n\n") + error.message);
      return;
    }
  }
  onTerminalResize(cols, rows) {
    for (const { process } of this.#terminals) {
      process.resize({ cols, rows });
    }
  }
}

const logger$2 = createScopedLogger("ActionRunner");
class ActionRunner {
  #webcontainer;
  #currentExecutionPromise = Promise.resolve();
  actions = map({});
  constructor(webcontainerPromise) {
    this.#webcontainer = webcontainerPromise;
  }
  addAction(data) {
    const { actionId } = data;
    const actions = this.actions.get();
    const action = actions[actionId];
    if (action) {
      return;
    }
    const abortController = new AbortController();
    this.actions.setKey(actionId, {
      ...data.action,
      status: "pending",
      executed: false,
      abort: () => {
        abortController.abort();
        this.#updateAction(actionId, { status: "aborted" });
      },
      abortSignal: abortController.signal
    });
    this.#currentExecutionPromise.then(() => {
      this.#updateAction(actionId, { status: "running" });
    });
  }
  async runAction(data) {
    const { actionId } = data;
    const action = this.actions.get()[actionId];
    if (!action) {
      unreachable(`Action ${actionId} not found`);
    }
    if (action.executed) {
      return;
    }
    this.#updateAction(actionId, { ...action, ...data.action, executed: true });
    this.#currentExecutionPromise = this.#currentExecutionPromise.then(() => {
      return this.#executeAction(actionId);
    }).catch((error) => {
      console.error("Action failed:", error);
    });
  }
  async #executeAction(actionId) {
    const action = this.actions.get()[actionId];
    this.#updateAction(actionId, { status: "running" });
    try {
      switch (action.type) {
        case "shell": {
          await this.#runShellAction(action);
          break;
        }
        case "file": {
          await this.#runFileAction(action);
          break;
        }
      }
      this.#updateAction(actionId, { status: action.abortSignal.aborted ? "aborted" : "complete" });
    } catch (error) {
      this.#updateAction(actionId, { status: "failed", error: "Action failed" });
      throw error;
    }
  }
  async #runShellAction(action) {
    if (action.type !== "shell") {
      unreachable("Expected shell action");
    }
    const webcontainer = await this.#webcontainer;
    const process = await webcontainer.spawn("jsh", ["-c", action.content], {
      env: { npm_config_yes: true }
    });
    action.abortSignal.addEventListener("abort", () => {
      process.kill();
    });
    process.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        }
      })
    );
    const exitCode = await process.exit;
    logger$2.debug(`Process terminated with code ${exitCode}`);
  }
  async #runFileAction(action) {
    if (action.type !== "file") {
      unreachable("Expected file action");
    }
    const webcontainer = await this.#webcontainer;
    let filePath = action.filePath;
    if (filePath.startsWith("/")) {
      filePath = filePath.slice(1);
    }
    const workDirWithoutSlash = WORK_DIR.slice(1);
    if (filePath.startsWith(workDirWithoutSlash + "/")) {
      filePath = filePath.slice(workDirWithoutSlash.length + 1);
    }
    if (!filePath.startsWith(WORK_DIR.slice(1))) {
      filePath = nodePath.join(WORK_DIR, filePath);
    } else {
      filePath = "/" + filePath;
    }
    const workdirRelativePath = filePath.replace(WORK_DIR + "/", "").replace(/^\//, "");
    const folder = nodePath.dirname(workdirRelativePath);
    if (folder && folder !== ".") {
      try {
        await webcontainer.fs.mkdir(folder, { recursive: true });
        logger$2.debug(`Created folder: ${folder}`);
      } catch (error) {
        logger$2.error(`Failed to create folder ${folder}

`, error);
      }
    }
    try {
      await webcontainer.fs.writeFile(workdirRelativePath, action.content);
      logger$2.debug(`File written: ${workdirRelativePath}`);
    } catch (error) {
      logger$2.error(`Failed to write file ${workdirRelativePath}

`, error);
    }
  }
  #updateAction(id, newState) {
    const actions = this.actions.get();
    this.actions.setKey(id, { ...actions[id], ...newState });
  }
}

let webcontainer = new Promise(() => {
});

class WorkbenchStore {
  #previewsStore = new PreviewsStore(webcontainer);
  #filesStore = new FilesStore(webcontainer);
  #editorStore = new EditorStore(this.#filesStore);
  #terminalStore = new TerminalStore(webcontainer);
  artifacts = map({});
  showWorkbench = atom(false);
  currentView = atom("code");
  unsavedFiles = atom(/* @__PURE__ */ new Set());
  modifiedFiles = /* @__PURE__ */ new Set();
  artifactIdList = [];
  constructor() {
  }
  get previews() {
    return this.#previewsStore.previews;
  }
  get files() {
    return this.#filesStore.files;
  }
  get currentDocument() {
    return this.#editorStore.currentDocument;
  }
  get selectedFile() {
    return this.#editorStore.selectedFile;
  }
  get firstArtifact() {
    return this.#getArtifact(this.artifactIdList[0]);
  }
  get filesCount() {
    return this.#filesStore.filesCount;
  }
  get showTerminal() {
    return this.#terminalStore.showTerminal;
  }
  toggleTerminal(value) {
    this.#terminalStore.toggleTerminal(value);
  }
  attachTerminal(terminal) {
    this.#terminalStore.attachTerminal(terminal);
  }
  onTerminalResize(cols, rows) {
    this.#terminalStore.onTerminalResize(cols, rows);
  }
  setDocuments(files) {
    this.#editorStore.setDocuments(files);
    if (this.#filesStore.filesCount > 0 && this.currentDocument.get() === void 0) {
      for (const [filePath, dirent] of Object.entries(files)) {
        if (dirent?.type === "file") {
          this.setSelectedFile(filePath);
          break;
        }
      }
    }
  }
  setShowWorkbench(show) {
    this.showWorkbench.set(show);
  }
  setCurrentDocumentContent(newContent) {
    const filePath = this.currentDocument.get()?.filePath;
    if (!filePath) {
      return;
    }
    const originalContent = this.#filesStore.getFile(filePath)?.content;
    const unsavedChanges = originalContent !== void 0 && originalContent !== newContent;
    this.#editorStore.updateFile(filePath, newContent);
    const currentDocument = this.currentDocument.get();
    if (currentDocument) {
      const previousUnsavedFiles = this.unsavedFiles.get();
      if (unsavedChanges && previousUnsavedFiles.has(currentDocument.filePath)) {
        return;
      }
      const newUnsavedFiles = new Set(previousUnsavedFiles);
      if (unsavedChanges) {
        newUnsavedFiles.add(currentDocument.filePath);
      } else {
        newUnsavedFiles.delete(currentDocument.filePath);
      }
      this.unsavedFiles.set(newUnsavedFiles);
    }
  }
  setCurrentDocumentScrollPosition(position) {
    const editorDocument = this.currentDocument.get();
    if (!editorDocument) {
      return;
    }
    const { filePath } = editorDocument;
    this.#editorStore.updateScrollPosition(filePath, position);
  }
  setSelectedFile(filePath) {
    this.#editorStore.setSelectedFile(filePath);
  }
  async saveFile(filePath) {
    const documents = this.#editorStore.documents.get();
    const document = documents[filePath];
    if (document === void 0) {
      return;
    }
    await this.#filesStore.saveFile(filePath, document.value);
    const newUnsavedFiles = new Set(this.unsavedFiles.get());
    newUnsavedFiles.delete(filePath);
    this.unsavedFiles.set(newUnsavedFiles);
  }
  async saveCurrentDocument() {
    const currentDocument = this.currentDocument.get();
    if (currentDocument === void 0) {
      return;
    }
    await this.saveFile(currentDocument.filePath);
  }
  resetCurrentDocument() {
    const currentDocument = this.currentDocument.get();
    if (currentDocument === void 0) {
      return;
    }
    const { filePath } = currentDocument;
    const file = this.#filesStore.getFile(filePath);
    if (!file) {
      return;
    }
    this.setCurrentDocumentContent(file.content);
  }
  async saveAllFiles() {
    for (const filePath of this.unsavedFiles.get()) {
      await this.saveFile(filePath);
    }
  }
  getFileModifcations() {
    return this.#filesStore.getFileModifications();
  }
  resetAllFileModifications() {
    this.#filesStore.resetFileModifications();
  }
  abortAllActions() {
  }
  addArtifact({ messageId, title, id }) {
    const artifact = this.#getArtifact(messageId);
    if (artifact) {
      return;
    }
    if (!this.artifactIdList.includes(messageId)) {
      this.artifactIdList.push(messageId);
    }
    this.artifacts.setKey(messageId, {
      id,
      title,
      closed: false,
      runner: new ActionRunner(webcontainer)
    });
  }
  updateArtifact({ messageId }, state) {
    const artifact = this.#getArtifact(messageId);
    if (!artifact) {
      return;
    }
    this.artifacts.setKey(messageId, { ...artifact, ...state });
  }
  async addAction(data) {
    const { messageId } = data;
    const artifact = this.#getArtifact(messageId);
    if (!artifact) {
      unreachable("Artifact not found");
    }
    artifact.runner.addAction(data);
  }
  async runAction(data) {
    const { messageId } = data;
    const artifact = this.#getArtifact(messageId);
    if (!artifact) {
      unreachable("Artifact not found");
    }
    artifact.runner.runAction(data);
  }
  #getArtifact(id) {
    const artifacts = this.artifacts.get();
    return artifacts[id];
  }
}
const workbenchStore = new WorkbenchStore();

const chatId = atom(void 0);
atom(void 0);

const getAvailableProviders = undefined;
const getUnavailableProviders = undefined;

const availableProviders = atom(/* @__PURE__ */ new Set());
const unavailableProviders = atom(/* @__PURE__ */ new Set());
function initializeProviderAvailability() {
  if (typeof window === "undefined") {
    return;
  }
  const available = getAvailableProviders();
  const unavailable = getUnavailableProviders();
  availableProviders.set(new Set(available));
  unavailableProviders.set(new Set(unavailable));
  console.log("[Provider Availability] Available providers:", available);
  console.log("[Provider Availability] Unavailable providers:", unavailable);
}
computed(availableProviders, (providers) => {
  return (provider) => providers.has(provider);
});

function ModelSelector() {
  const model = useStore(currentModel);
  const activeChatId = useStore(chatId);
  const chatModelMap = useStore(chatModels);
  const chatSelection = activeChatId ? chatModelMap[activeChatId] : void 0;
  const selectedModelInfo = getModel(model.provider, model.modelId);
  const availableProvidersSet = useStore(availableProviders);
  useEffect(() => {
    initializeProviderAvailability();
  }, []);
  useEffect(() => {
    if (!chatSelection) {
      return;
    }
    if (chatSelection.fullId !== model.fullId) {
      setCurrentModel(chatSelection.provider, chatSelection.modelId);
    }
  }, [chatSelection?.fullId, chatSelection?.modelId, chatSelection?.provider, model.fullId]);
  useEffect(() => {
    if (!activeChatId) {
      return;
    }
    const chatModel = chatSelection;
    if (!chatModel) {
      setChatModel(activeChatId, model.provider, model.modelId);
    }
  }, [activeChatId, chatSelection, model.provider, model.modelId]);
  const handleValueChange = (value) => {
    const [provider, modelId] = value.split(":");
    setCurrentModel(provider, modelId);
    if (activeChatId) {
      setChatModel(activeChatId, provider, modelId);
    }
  };
  return /* @__PURE__ */ jsxs(SelectPrimitive.Root, { value: model.fullId, onValueChange: handleValueChange, children: [
    /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, { className: "inline-flex items-center justify-between gap-2 px-3 py-2 text-sm bg-bolt-elements-background-depth-2 hover:bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor rounded-lg transition-colors min-w-[200px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-bolt-elements-textSecondary" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium text-bolt-elements-textPrimary", children: selectedModelInfo ? selectedModelInfo.name : model.fullId })
      ] }),
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-bolt-elements-textSecondary" }) })
    ] }),
    /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
      SelectPrimitive.Content,
      {
        className: "overflow-hidden bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor rounded-lg shadow-lg z-[9999] min-w-[400px]",
        position: "popper",
        sideOffset: 5,
        align: "start",
        children: [
          /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, { className: "flex items-center justify-center h-6 bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary cursor-default", children: "▲" }),
          /* @__PURE__ */ jsx(SelectPrimitive.Viewport, { className: "p-1 max-h-[400px]", children: PROVIDERS.map((provider) => {
            const isAvailable = availableProvidersSet.has(provider.id);
            return /* @__PURE__ */ jsxs(SelectPrimitive.Group, { children: [
              /* @__PURE__ */ jsxs(SelectPrimitive.Label, { className: "px-6 py-2 text-xs font-semibold text-bolt-elements-textSecondary uppercase flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: `w-2 h-2 rounded-full ${isAvailable ? "bg-green-500" : "bg-gray-500"}` }),
                provider.name,
                !isAvailable && /* @__PURE__ */ jsx("span", { className: "text-[10px] normal-case text-bolt-elements-textTertiary", children: "(API key not configured)" })
              ] }),
              provider.models.map((modelInfo) => /* @__PURE__ */ jsx(
                ModelOption,
                {
                  model: modelInfo,
                  isAvailable
                },
                `${provider.id}:${modelInfo.id}`
              ))
            ] }, provider.id);
          }) }),
          /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, { className: "flex items-center justify-center h-6 bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary cursor-default", children: "▼" })
        ]
      }
    ) })
  ] });
}
function ModelOption({ model, isAvailable }) {
  const fullId = `${model.provider}:${model.id}`;
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      value: fullId,
      disabled: !isAvailable,
      className: `relative flex items-center px-6 py-2 text-sm rounded select-none outline-none ${isAvailable ? "cursor-pointer hover:bg-bolt-elements-background-depth-3 focus:bg-bolt-elements-background-depth-3 data-[state=checked]:bg-bolt-elements-background-depth-3" : "cursor-not-allowed opacity-50"}`,
      children: [
        /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { className: "absolute left-2 inline-flex items-center", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-bolt-elements-textPrimary" }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: "flex-1 ml-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-bolt-elements-textPrimary", children: model.name }),
            model.isDefault && /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 text-xs rounded bg-bolt-elements-button-primary-background text-bolt-elements-button-primary-text", children: "Default" }),
            !isAvailable && /* @__PURE__ */ jsx(Lock, { className: "w-3 h-3 text-bolt-elements-textTertiary" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-bolt-elements-textSecondary mt-0.5", children: [
            model.description,
            !isAvailable && /* @__PURE__ */ jsx("span", { className: "block text-orange-400 mt-0.5", children: "⚠ API key required" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsx(ModelCapabilityBadges, { model }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-bolt-elements-textTertiary", children: [
              "$",
              model.pricing.input.toFixed(2),
              "/$",
              model.pricing.output.toFixed(2),
              " per 1M tokens"
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
function ModelCapabilityBadges({ model }) {
  const badges = [];
  if (model.capabilities.fast) {
    badges.push(
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "inline-flex items-center gap-1 px-1.5 py-0.5 text-xs rounded bg-green-500/10 text-green-400",
          title: "Fast",
          children: /* @__PURE__ */ jsx(Zap, { className: "w-3 h-3" })
        },
        "fast"
      )
    );
  }
  if (model.capabilities.reasoning) {
    badges.push(
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "inline-flex items-center gap-1 px-1.5 py-0.5 text-xs rounded bg-purple-500/10 text-purple-400",
          title: "Advanced Reasoning",
          children: /* @__PURE__ */ jsx(Brain, { className: "w-3 h-3" })
        },
        "reasoning"
      )
    );
  }
  if (model.capabilities.vision) {
    badges.push(
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "inline-flex items-center gap-1 px-1.5 py-0.5 text-xs rounded bg-blue-500/10 text-blue-400",
          title: "Vision",
          children: /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3" })
        },
        "vision"
      )
    );
  }
  if (model.capabilities.tools) {
    badges.push(
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "inline-flex items-center gap-1 px-1.5 py-0.5 text-xs rounded bg-orange-500/10 text-orange-400",
          title: "Tool Use",
          children: /* @__PURE__ */ jsx(Wrench, { className: "w-3 h-3" })
        },
        "tools"
      )
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: badges });
}

const SendButton = undefined;

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-bolt-elements-button-primary-background text-bolt-elements-button-primary-text hover:bg-bolt-elements-button-primary-backgroundHover shadow-sm hover:shadow-md",
        secondary: "bg-bolt-elements-button-secondary-background text-bolt-elements-button-secondary-text hover:bg-bolt-elements-button-secondary-backgroundHover shadow-sm hover:shadow-md",
        outline: "border border-bolt-elements-borderColor bg-transparent text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-2 hover:border-bolt-elements-borderColorActive",
        ghost: "bg-transparent text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-3",
        subtle: "bg-bolt-elements-background-depth-2 text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-3 border border-transparent hover:border-bolt-elements-borderColor",
        danger: "bg-bolt-elements-button-danger-background text-bolt-elements-button-danger-text hover:bg-bolt-elements-button-danger-backgroundHover focus-visible:ring-bolt-elements-button-danger-background shadow-sm hover:shadow-md"
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "h-10 w-10 p-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, type = "button", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        className: cn(buttonVariants({ variant, size }), className),
        ...!asChild ? { type } : {},
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const logger$1 = createScopedLogger("Migration");
async function migrateIndexedDBToSupabase() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("User must be logged in to migrate. Please sign in first.");
  }
  logger$1.info("Starting migration for user:", user.email);
  const db = await openDatabase();
  if (!db) {
    throw new Error("Could not open IndexedDB. Migration cannot proceed.");
  }
  const chats = await getAll(db);
  logger$1.info(`Found ${chats.length} chats in IndexedDB`);
  const results = {
    success: 0,
    failed: 0,
    skipped: 0,
    errors: [],
    totalChats: chats.length
  };
  if (chats.length === 0) {
    logger$1.info("No chats to migrate");
    return results;
  }
  const { data: existingChats } = await supabase.from("chats").select("url_id").eq("user_id", user.id);
  const existingUrlIds = new Set(existingChats?.map((c) => c.url_id) || []);
  for (const chat of chats) {
    try {
      const urlId = chat.urlId || chat.id;
      if (existingUrlIds.has(urlId)) {
        logger$1.info(`Skipping chat ${urlId} - already exists in Supabase`);
        results.skipped++;
        continue;
      }
      const { error } = await supabase.from("chats").upsert(
        {
          user_id: user.id,
          url_id: urlId,
          description: chat.description || null,
          messages: chat.messages,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          onConflict: "url_id,user_id"
        }
      );
      if (error) {
        throw error;
      }
      logger$1.info(`Successfully migrated chat ${urlId}`);
      results.success++;
    } catch (error) {
      logger$1.error(`Failed to migrate chat ${chat.id}:`, error);
      results.failed++;
      results.errors.push(`Chat ${chat.urlId || chat.id}: ${error.message}`);
    }
  }
  logger$1.info("Migration complete:", results);
  return results;
}
async function hasLocalChats() {
  try {
    const db = await openDatabase();
    if (!db) {
      return false;
    }
    const chats = await getAll(db);
    return chats.length > 0;
  } catch (error) {
    logger$1.error("Error checking for local chats:", error);
    return false;
  }
}

function MigrationBanner() {
  const { user } = useAuth();
  const [hasChats, setHasChats] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (!user) {
      return;
    }
    const wasDismissed = localStorage.getItem("migration-banner-dismissed");
    if (wasDismissed === "true") {
      setDismissed(true);
      return;
    }
    hasLocalChats().then((has) => {
      setHasChats(has);
    });
  }, [user]);
  const handleMigrate = async () => {
    setMigrating(true);
    setResult(null);
    try {
      const migrationResult = await migrateIndexedDBToSupabase();
      setResult(migrationResult);
      if (migrationResult.success > 0) {
        toast.success(
          `Successfully migrated ${migrationResult.success} chat${migrationResult.success > 1 ? "s" : ""}!`
        );
      }
      if (migrationResult.failed > 0) {
        toast.error(`Failed to migrate ${migrationResult.failed} chat${migrationResult.failed > 1 ? "s" : ""}`);
      }
      if (migrationResult.skipped > 0) {
        toast.info(
          `Skipped ${migrationResult.skipped} chat${migrationResult.skipped > 1 ? "s" : ""} (already migrated)`
        );
      }
    } catch (error) {
      toast.error(error.message);
      setResult({
        success: 0,
        failed: 0,
        skipped: 0,
        errors: [error.message],
        totalChats: 0
      });
    } finally {
      setMigrating(false);
    }
  };
  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("migration-banner-dismissed", "true");
  };
  if (!user || !hasChats || dismissed || result && result.failed === 0 && result.success > 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-bolt-elements-borderColor/80 bg-bolt-elements-background-depth-2/95 p-5 shadow-md", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-bolt-elements-button-primary-background/30 blur-3xl" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 md:flex-row md:items-start md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-start gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-bolt-elements-button-primary-background text-bolt-elements-button-primary-text", children: /* @__PURE__ */ jsx(Database, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-bolt-elements-textPrimary", children: "Local chat history detected" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-bolt-elements-textSecondary", children: "Migrate to the cloud to sync across devices and keep every conversation safe." })
          ] }),
          result ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-bolt-elements-borderColor/60 bg-bolt-elements-background-depth-1/80 px-4 py-3 text-sm text-bolt-elements-textSecondary", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-bolt-elements-textPrimary", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-sm", children: "Migration results" }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-bolt-elements-textSecondary", children: [
                result.totalChats,
                " total chats"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-2 text-xs sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-bolt-elements-background-depth-2/70 px-3 py-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-wide text-bolt-elements-textTertiary", children: "Migrated" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-bolt-elements-button-primary-text", children: result.success })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-bolt-elements-background-depth-2/70 px-3 py-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-wide text-bolt-elements-textTertiary", children: "Skipped" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-bolt-elements-textSecondary", children: result.skipped })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-bolt-elements-button-danger-background/10 px-3 py-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-wide text-bolt-elements-textTertiary", children: "Failed" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-bolt-elements-button-danger-text", children: result.failed })
              ] })
            ] }),
            result.errors.length > 0 ? /* @__PURE__ */ jsxs("details", { className: "mt-2 text-xs", children: [
              /* @__PURE__ */ jsx("summary", { className: "cursor-pointer text-bolt-elements-button-danger-text", children: "View errors" }),
              /* @__PURE__ */ jsx("ul", { className: "ml-4 mt-1 list-disc space-y-1", children: result.errors.map((error, index) => /* @__PURE__ */ jsx("li", { children: error }, index)) })
            ] }) : null
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 self-end md:self-start", children: [
        /* @__PURE__ */ jsx(Button, { onClick: handleMigrate, disabled: migrating, className: "min-w-[140px]", size: "md", children: migrating ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader, { className: "h-4 w-4 animate-spin" }),
          "Migrating…"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
          "Migrate now"
        ] }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "md",
            onClick: handleDismiss,
            disabled: migrating,
            className: "h-11 w-11 shrink-0 rounded-full",
            title: "Dismiss this banner",
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
          }
        )
      ] })
    ] })
  ] });
}

const Menu = undefined;

const variantStyles = {
  default: "bg-bolt-elements-background-depth-3 text-bolt-elements-textPrimary border-bolt-elements-borderColor",
  success: "bg-bolt-elements-icon-success/10 text-bolt-elements-icon-success border-bolt-elements-icon-success/30",
  error: "bg-bolt-elements-icon-error/10 text-bolt-elements-icon-error border-bolt-elements-icon-error/30",
  warning: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  pulse: "bg-primary/10 text-primary border-primary/30"
};
const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base"
};
const AnimatedBadge = React.forwardRef(
  ({ className, variant = "default", size = "md", pulse = false, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "span",
      {
        ref,
        className: cn(
          "inline-flex items-center gap-2 rounded-full border font-semibold transition-all",
          variantStyles[variant],
          sizeStyles[size],
          pulse && "animate-pulse",
          className
        ),
        ...props,
        children: [
          pulse && /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-current animate-pulse" }),
          children
        ]
      }
    );
  }
);
AnimatedBadge.displayName = "AnimatedBadge";

const FeatureCard = React.forwardRef(
  ({ className, icon: iconComponent, title, description, gradient = false, delay = 0, ...props }, ref) => {
    const Icon = iconComponent;
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref,
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay },
        className: cn(
          "group relative overflow-hidden rounded-2xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-6 transition-all duration-300",
          "hover:border-bolt-elements-borderColorActive hover:shadow-lg hover:-translate-y-1",
          gradient && "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300",
                  "bg-bolt-elements-button-primary-background text-bolt-elements-icon-primary",
                  "group-hover:scale-110 group-hover:rotate-3"
                ),
                children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold text-bolt-elements-textPrimary", children: title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-bolt-elements-textSecondary", children: description })
          ] }),
          gradient && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" })
        ]
      }
    );
  }
);
FeatureCard.displayName = "FeatureCard";

const gradientVariants = {
  primary: "gradient-text-primary",
  success: "bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent",
  rainbow: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
};
const GradientText = React.forwardRef(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return /* @__PURE__ */ jsx("span", { ref, className: cn("font-bold", gradientVariants[variant], className), ...props, children });
  }
);
GradientText.displayName = "GradientText";

const IconButton = memo(
  ({
    icon: iconComponent,
    size = "xl",
    className,
    iconClassName,
    disabledClassName,
    disabled = false,
    title,
    onClick,
    children
  }) => {
    const IconComponent = iconComponent;
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: cn(
          "flex items-center text-bolt-elements-item-contentDefault bg-transparent enabled:hover:text-bolt-elements-item-contentActive rounded-md p-1 enabled:hover:bg-bolt-elements-item-backgroundActive disabled:cursor-not-allowed",
          disabled && cn("opacity-30", disabledClassName),
          className
        ),
        title,
        disabled,
        onClick: (event) => {
          if (disabled) {
            return;
          }
          onClick?.(event);
        },
        children: children ? children : IconComponent && /* @__PURE__ */ jsx(IconComponent, { className: cn(getIconSize(size), iconClassName) })
      }
    );
  }
);
function getIconSize(size) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
    xxl: "w-8 h-8"
  };
  return sizeMap[size];
}

const Workbench = undefined;

function classNames(...args) {
  let classes = "";
  for (const arg of args) {
    classes = appendClass(classes, parseValue(arg));
  }
  return classes;
}
function parseValue(arg) {
  if (typeof arg === "string" || typeof arg === "number") {
    return arg;
  }
  if (typeof arg !== "object") {
    return "";
  }
  if (Array.isArray(arg)) {
    return classNames(...arg);
  }
  let classes = "";
  for (const key in arg) {
    if (arg[key]) {
      classes = appendClass(classes, key);
    }
  }
  return classes;
}
function appendClass(value, newClass) {
  if (!newClass) {
    return value;
  }
  if (value) {
    return value + " " + newClass;
  }
  return value + newClass;
}

const TEXTAREA_MIN_HEIGHT = 76;
const BaseChat = React__default.forwardRef(
  ({
    textareaRef,
    messageRef,
    scrollRef,
    showChat = true,
    chatStarted = false,
    isStreaming = false,
    enhancingPrompt = false,
    promptEnhanced = false,
    messages,
    input = "",
    sendMessage,
    handleInputChange,
    enhancePrompt,
    handleStop
  }, ref) => {
    const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: classNames(
          styles.BaseChat,
          "relative flex h-full w-full overflow-hidden bg-gradient-to-br from-bolt-elements-background-depth-1 via-bolt-elements-background-depth-1/95 to-bolt-elements-background-depth-2"
        ),
        "data-chat-visible": showChat,
        children: [
          /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx(Menu, {}) }),
          /* @__PURE__ */ jsxs("div", { ref: scrollRef, className: "flex overflow-y-auto w-full h-full", children: [
            /* @__PURE__ */ jsxs("div", { className: classNames(styles.Chat, "flex flex-col flex-grow min-w-[var(--chat-min-width)] h-full"), children: [
              !chatStarted && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  id: "intro",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  className: "mx-auto mt-[12vh] flex w-full max-w-4xl flex-col items-center gap-10 px-6 text-center",
                  children: [
                    /* @__PURE__ */ jsxs(AnimatedBadge, { variant: "pulse", pulse: true, size: "md", className: "animate-slideInFromBottom", children: [
                      /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
                      "BoltDIY V2.0"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                      /* @__PURE__ */ jsxs(
                        motion.h1,
                        {
                          initial: { opacity: 0, y: 20 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 0.1 },
                          className: "text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl",
                          children: [
                            "Where ",
                            /* @__PURE__ */ jsx(GradientText, { children: "ideas begin" }),
                            /* @__PURE__ */ jsx("br", {}),
                            "and launch"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        motion.p,
                        {
                          initial: { opacity: 0, y: 20 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 0.2 },
                          className: "mx-auto max-w-2xl text-lg text-bolt-elements-textSecondary sm:text-xl text-balance",
                          children: "Design, develop, and deploy in one canvas. Craft a prompt, hand off tasks to AI, and iterate together in real time with BoltDIY V2.0."
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
                      /* @__PURE__ */ jsx(
                        FeatureCard,
                        {
                          icon: Zap,
                          title: "Instant Previews",
                          description: "See every change in real-time without leaving the chat. Deploy with a single command.",
                          gradient: true,
                          delay: 0.3
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        FeatureCard,
                        {
                          icon: Code,
                          title: "Smart Context",
                          description: "BoltDIY remembers your project, tracks files, and suggests next steps intelligently.",
                          gradient: true,
                          delay: 0.4
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        FeatureCard,
                        {
                          icon: Rocket,
                          title: "Ship Faster",
                          description: "From idea to deployment in minutes. AI handles the heavy lifting while you focus on creativity.",
                          gradient: true,
                          delay: 0.5,
                          className: "sm:col-span-2 lg:col-span-1"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: classNames("px-6 pt-10 sm:pt-12", {
                    "h-full flex flex-col": chatStarted
                  }),
                  children: [
                    /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx("div", { className: "w-full max-w-chat mx-auto mb-4", children: /* @__PURE__ */ jsx(MigrationBanner, {}) }) }),
                    /* @__PURE__ */ jsx(ClientOnly, { children: () => {
                      return chatStarted ? /* @__PURE__ */ jsx(
                        Messages,
                        {
                          ref: messageRef,
                          className: "flex flex-col w-full flex-1 max-w-chat px-4 pb-6 mx-auto z-[1]",
                          messages,
                          isStreaming
                        }
                      ) : null;
                    } }),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: classNames("relative z-[2] mx-auto w-full max-w-chat", {
                          "sticky bottom-0": chatStarted
                        }),
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-bolt-elements-borderColor/70 bg-bolt-elements-background-depth-1/90 shadow-lg backdrop-blur-xl", children: [
                            /* @__PURE__ */ jsx(
                              "textarea",
                              {
                                ref: textareaRef,
                                className: "w-full resize-none rounded-3xl border-none bg-transparent px-5 pb-5 pt-5 text-base text-bolt-elements-textPrimary outline-none placeholder:text-bolt-elements-textTertiary",
                                onKeyDown: (event) => {
                                  if (event.key === "Enter") {
                                    if (event.shiftKey) {
                                      return;
                                    }
                                    event.preventDefault();
                                    sendMessage?.(event);
                                  }
                                },
                                value: input,
                                onChange: (event) => {
                                  handleInputChange?.(event);
                                },
                                style: {
                                  minHeight: TEXTAREA_MIN_HEIGHT,
                                  maxHeight: TEXTAREA_MAX_HEIGHT
                                },
                                placeholder: "How can BoltDIY help you today?",
                                translate: "no"
                              }
                            ),
                            /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx(
                              SendButton,
                              {
                                show: input.length > 0 || isStreaming,
                                isStreaming,
                                onClick: (event) => {
                                  if (isStreaming) {
                                    handleStop?.();
                                    return;
                                  }
                                  sendMessage?.(event);
                                }
                              }
                            ) }),
                            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between px-5 pb-4 text-sm", children: [
                              /* @__PURE__ */ jsx("div", { className: "flex gap-1 items-center", children: /* @__PURE__ */ jsx(
                                IconButton,
                                {
                                  title: "Enhance prompt",
                                  disabled: input.length === 0 || enhancingPrompt,
                                  className: classNames({
                                    "!opacity-100": enhancingPrompt,
                                    "!text-bolt-elements-item-contentAccent pr-1.5 enabled:hover:!bg-bolt-elements-item-backgroundAccent": promptEnhanced
                                  }),
                                  onClick: () => enhancePrompt?.(),
                                  children: enhancingPrompt ? /* @__PURE__ */ jsxs(Fragment, { children: [
                                    /* @__PURE__ */ jsx(Loader, { className: "w-5 h-5 text-bolt-elements-loader-progress animate-spin" }),
                                    /* @__PURE__ */ jsx("div", { className: "ml-1.5", children: "Enhancing prompt..." })
                                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                                    /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }),
                                    promptEnhanced && /* @__PURE__ */ jsx("div", { className: "ml-1.5 text-xs", children: "Prompt enhanced" })
                                  ] })
                                }
                              ) }),
                              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center", children: [
                                /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx(ModelSelector, {}) }),
                                input.length > 3 ? /* @__PURE__ */ jsxs("div", { className: "text-xs text-bolt-elements-textSecondary", children: [
                                  "Use ",
                                  /* @__PURE__ */ jsx("kbd", { className: "kdb", children: "Shift" }),
                                  " + ",
                                  /* @__PURE__ */ jsx("kbd", { className: "kdb", children: "Return" }),
                                  " for a new line"
                                ] }) : null
                              ] })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "pb-8" })
                        ]
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx(Workbench, { chatStarted, isStreaming }) })
          ] })
        ]
      }
    );
  }
);

const Chat = undefined;

function ConnectionStatus() {
  const { user } = useAuth();
  const { status, syncing, error } = useStore(connectionStore);
  useEffect(() => {
    setConnected(user?.id || null);
  }, [user?.id]);
  const getStatusConfig = () => {
    if (error) {
      return {
        icon: CloudOff,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        label: "Connection Error",
        description: error
      };
    }
    switch (status) {
      case "supabase":
        return {
          icon: Cloud,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          label: "Cloud Storage",
          description: "Your data is being synced to the cloud"
        };
      case "indexeddb":
        return {
          icon: Database,
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          label: "Local Storage",
          description: "Your data is stored locally. Sign in to sync to cloud."
        };
      case "disconnected":
        return {
          icon: CloudOff,
          color: "text-gray-500",
          bgColor: "bg-gray-500/10",
          label: "Disconnected",
          description: "No storage available"
        };
    }
  };
  const config = getStatusConfig();
  const Icon = config.icon;
  return /* @__PURE__ */ jsx(Tooltip$1.Provider, { delayDuration: 200, children: /* @__PURE__ */ jsxs(Tooltip$1.Root, { children: [
    /* @__PURE__ */ jsx(Tooltip$1.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bgColor} border border-bolt-elements-borderColor hover:border-bolt-elements-borderColorActive transition-colors cursor-help`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            syncing ? /* @__PURE__ */ jsx(Loader, { className: `w-4 h-4 ${config.color} animate-spin` }) : /* @__PURE__ */ jsx(Icon, { className: `w-4 h-4 ${config.color}` }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute -top-0.5 -right-0.5 w-2 h-2 ${config.color.replace("text-", "bg-")} rounded-full ${syncing ? "animate-pulse" : ""}`
              }
            )
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-bolt-elements-textPrimary", children: config.label })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip$1.Portal, { children: /* @__PURE__ */ jsxs(
      Tooltip$1.Content,
      {
        className: "px-3 py-2 bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor rounded-lg shadow-lg max-w-xs z-[9999]",
        sideOffset: 5,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-bolt-elements-textPrimary", children: config.label }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-bolt-elements-textSecondary", children: config.description }),
            syncing && /* @__PURE__ */ jsx("p", { className: "text-xs text-bolt-elements-textSecondary italic mt-2", children: "Syncing data..." })
          ] }),
          /* @__PURE__ */ jsx(Tooltip$1.Arrow, { className: "fill-bolt-elements-background-depth-2" })
        ]
      }
    ) })
  ] }) });
}

const HeaderActionButtons = undefined;

function ModelBadge() {
  const selection = useStore(currentModel);
  const modelInfo = getModel(selection.provider, selection.modelId);
  const providerName = PROVIDERS.find((provider) => provider.id === selection.provider)?.name ?? selection.provider;
  if (!modelInfo) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-full border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 px-3 py-1 text-xs text-bolt-elements-textSecondary", children: [
    /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-bolt-elements-textTertiary" }),
    /* @__PURE__ */ jsx("span", { className: "font-medium text-bolt-elements-textPrimary", children: modelInfo.name }),
    /* @__PURE__ */ jsx("span", { className: "text-bolt-elements-textTertiary", children: "•" }),
    /* @__PURE__ */ jsx("span", { children: providerName })
  ] });
}

const ChatDescription = undefined;

const chatStore = map({
  started: false,
  aborted: false,
  showChat: true
});

function Header() {
  const chat = useStore(chatStore);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: classNames(
        "flex items-center justify-between bg-bolt-elements-background-depth-1 px-6 py-3 h-[var(--header-height)] transition-colors",
        {
          "border-b border-transparent": !chat.started,
          "border-b border-bolt-elements-borderColor shadow-sm": chat.started
        }
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 z-[998]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md", children: /* @__PURE__ */ jsx("div", { className: "truncate text-center text-sm font-medium text-bolt-elements-textPrimary", children: /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx(ChatDescription, {}) }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx(ConnectionStatus, {}) }),
          /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx(ModelBadge, {}) }),
          chat.started && /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx("div", { className: "mr-1", children: /* @__PURE__ */ jsx(HeaderActionButtons, {}) }) })
        ] })
      ]
    }
  );
}

const meta = () => {
  return [
    { title: "BoltDIY V2.0 - AI-Powered Development Platform" },
    {
      name: "description",
      content: "BoltDIY V2.0: Build, iterate, and deploy with AI. Your intelligent development companion."
    }
  ];
};
const loader$1 = () => json({});
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full w-full", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(ClientOnly, { fallback: /* @__PURE__ */ jsx(BaseChat, {}), children: () => /* @__PURE__ */ jsx(Chat, {}) })
  ] });
}

const route9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$1,
  meta
}, Symbol.toStringTag, { value: 'Module' }));

async function loader(args) {
  return json({ id: args.params.id });
}

const route6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: Index,
  loader
}, Symbol.toStringTag, { value: 'Module' }));

const DialogButton = memo(({ type, children, onClick }) => /* @__PURE__ */ jsx(
  "button",
  {
    className: classNames(
      "inline-flex h-[35px] items-center justify-center rounded-lg px-4 text-sm leading-none focus:outline-none",
      {
        "bg-bolt-elements-button-primary-background text-bolt-elements-button-primary-text hover:bg-bolt-elements-button-primary-backgroundHover": type === "primary",
        "bg-bolt-elements-button-secondary-background text-bolt-elements-button-secondary-text hover:bg-bolt-elements-button-secondary-backgroundHover": type === "secondary",
        "bg-bolt-elements-button-danger-background text-bolt-elements-button-danger-text hover:bg-bolt-elements-button-danger-backgroundHover": type === "danger"
      }
    ),
    onClick,
    children
  }
));
const DialogTitle = memo(({ className, children, ...props }) => /* @__PURE__ */ jsx(
  RadixDialog.Title,
  {
    className: classNames(
      "px-5 py-4 flex items-center justify-between border-b border-bolt-elements-borderColor text-lg font-semibold leading-6 text-bolt-elements-textPrimary",
      className
    ),
    ...props,
    children
  }
));
const DialogDescription = memo(({ className, children, ...props }) => /* @__PURE__ */ jsx(
  RadixDialog.Description,
  {
    className: classNames("px-5 py-4 text-bolt-elements-textPrimary text-base", className),
    ...props,
    children
  }
));
const Dialog = memo(({ className, children, onBackdrop, onClose }) => {
  return /* @__PURE__ */ jsxs(RadixDialog.Portal, { children: [
    /* @__PURE__ */ jsx(RadixDialog.Overlay, { onClick: onBackdrop, className: "fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm" }),
    /* @__PURE__ */ jsx(RadixDialog.Content, { className: "fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames(
          "relative max-h-[85vh] w-full max-w-[450px] overflow-hidden rounded-[var(--radius)] border border-bolt-elements-borderColor bg-bolt-elements-bg-depth-1 shadow-xl focus:outline-none",
          className
        ),
        style: { backgroundColor: "var(--bolt-elements-bg-depth-1)" },
        children: [
          children,
          /* @__PURE__ */ jsx(RadixDialog.Close, { asChild: true, onClick: onClose, children: /* @__PURE__ */ jsx(IconButton, { icon: X, className: "absolute right-3 top-3 z-10" }) })
        ]
      }
    ) })
  ] });
});

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;

const Form = FormProvider;
const FormFieldContext = React.createContext({});
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext({});
const FormItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx("div", { ref, className: cn("space-y-2", className), ...props }) });
  }
);
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      className: cn(error && "text-bolt-elements-button-danger-text", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return /* @__PURE__ */ jsx(
      Slot,
      {
        ref,
        id: formItemId,
        "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
        "aria-invalid": !!error,
        ...props
      }
    );
  }
);
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        id: formDescriptionId,
        className: cn("text-xs text-bolt-elements-textTertiary", className),
        ...props
      }
    );
  }
);
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;
    if (!body) {
      return null;
    }
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        id: formMessageId,
        className: cn("text-sm font-medium text-bolt-elements-button-danger-text", className),
        ...props,
        children: body
      }
    );
  }
);
FormMessage.displayName = "FormMessage";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type,
      className: cn(
        "flex h-11 w-full rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 px-3 py-2 text-sm text-bolt-elements-textPrimary shadow-sm transition-all duration-300 placeholder:text-bolt-elements-textTertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-bolt-elements-borderColorActive focus-visible:ring-offset-0 focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50 hover:border-bolt-elements-borderColorActive/50",
        className
      ),
      ...props
    }
  );
});
Input.displayName = "Input";

const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-bolt-elements-borderColor",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      ref,
      className: cn(
        "flex min-h-[120px] w-full rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 px-3 py-3 text-sm text-bolt-elements-textPrimary shadow-sm transition-colors placeholder:text-bolt-elements-textTertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

class ProjectService {
  async createProject(data) {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("Authentication required. Please sign in to create a project.");
    }
    const { data: project, error } = await supabase.from("projects").insert({
      ...data,
      user_id: user.id
    }).select().single();
    if (error) {
      console.error("Create project error:", error);
      throw new Error(error.message || "Failed to create project");
    }
    return project;
  }
  async getProjects() {
    const { data, error } = await supabase.from("projects").select("*").order("updated_at", { ascending: false });
    if (error) {
      console.error("Get projects error:", error);
      throw new Error(error.message || "Failed to load projects");
    }
    return data;
  }
  async getProject(id) {
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
    if (error) {
      console.error("Get project error:", error);
      throw new Error(error.message || "Failed to load project");
    }
    return data;
  }
  async updateProject(id, updates) {
    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single();
    if (error) {
      console.error("Update project error:", error);
      if (error.code === "PGRST116") {
        throw new Error("Project not found or you do not have permission to update it");
      }
      throw new Error(error.message || "Failed to update project");
    }
    return data;
  }
  async deleteProject(id) {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("Authentication required. Please sign in to delete projects.");
    }
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.error("Delete project error:", error);
      if (error.code === "PGRST116") {
        throw new Error("Project not found or you do not have permission to delete it");
      }
      throw new Error(error.message || "Failed to delete project");
    }
  }
  async shareProject(projectId, userEmail, role) {
    const { data: targetUser } = await supabase.from("users").select("id").eq("email", userEmail).single();
    if (!targetUser) {
      throw new Error("User not found");
    }
    const { error } = await supabase.from("project_collaborators").insert({
      project_id: projectId,
      user_id: targetUser.id,
      role
    });
    if (error) {
      console.error("Share project error:", error);
      throw new Error(error.message || "Failed to share project");
    }
  }
  async getCollaborators(projectId) {
    const { data, error } = await supabase.from("project_collaborators").select("*").eq("project_id", projectId);
    if (error) {
      console.error("Get collaborators error:", error);
      throw new Error(error.message || "Failed to load collaborators");
    }
    return data;
  }
  async removeCollaborator(projectId, userId) {
    const { error } = await supabase.from("project_collaborators").delete().eq("project_id", projectId).eq("user_id", userId);
    if (error) {
      console.error("Remove collaborator error:", error);
      throw new Error(error.message || "Failed to remove collaborator");
    }
  }
  async updateCollaboratorRole(projectId, userId, role) {
    const { error } = await supabase.from("project_collaborators").update({ role }).eq("project_id", projectId).eq("user_id", userId);
    if (error) {
      console.error("Update collaborator role error:", error);
      throw new Error(error.message || "Failed to update collaborator role");
    }
  }
}
const projectService = new ProjectService();

const projectSchema$1 = z.object({
  name: z.string().min(1, { message: "Project name is required" }).max(100, { message: "Project name must be 100 characters or less" }),
  description: z.string().max(500, { message: "Description must be 500 characters or less" }).optional(),
  visibility: z.enum(["private", "public"])
});
function CreateProjectDialog({ open, onClose, onCreated }) {
  const form = useForm({
    resolver: zodResolver(projectSchema$1),
    defaultValues: {
      name: "",
      description: "",
      visibility: "private"
    }
  });
  const visibilityOptions = useMemo(
    () => [
      {
        value: "private",
        label: "Private",
        helper: "Only invited collaborators can access.",
        icon: Lock
      },
      {
        value: "public",
        label: "Public",
        helper: "Share a link for anyone to explore.",
        icon: Globe
      }
    ],
    []
  );
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);
  const onSubmit = async (data) => {
    try {
      await projectService.createProject({
        name: data.name.trim(),
        description: data.description?.trim() || null,
        visibility: data.visibility
      });
      toast.success("Project created successfully");
      form.reset();
      onClose();
      onCreated?.();
    } catch (error) {
      toast.error(`Failed to create project: ${error.message}`);
    }
  };
  return /* @__PURE__ */ jsx(Root, { open, onOpenChange: (value) => !value ? onClose() : void 0, children: /* @__PURE__ */ jsxs(Dialog, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsx(DialogTitle, { className: "flex-col items-start gap-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-bolt-elements-textPrimary", children: "Create new project" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-full border border-bolt-elements-borderColor/60 bg-bolt-elements-background-depth-1 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-bolt-elements-textTertiary", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          "AI Setup"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-bolt-elements-textSecondary", children: "Create a workspace for your next idea. You can change these settings anytime." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "px-5 py-5", children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "name",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { className: "text-sm font-semibold text-bolt-elements-textPrimary", children: "Project name" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "My awesome project",
                ...field,
                autoFocus: true,
                disabled: form.formState.isSubmitting,
                className: "transition-all focus-visible:ring-2"
              }
            ) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "description",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxs(FormLabel, { className: "text-sm font-semibold text-bolt-elements-textPrimary", children: [
              "Description",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-bolt-elements-textTertiary", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Give collaborators a quick overview of what this project is about...",
                rows: 3,
                ...field,
                disabled: form.formState.isSubmitting,
                className: "min-h-[100px] transition-all focus-visible:ring-2"
              }
            ) }),
            /* @__PURE__ */ jsxs(FormDescription, { children: [
              field.value?.length || 0,
              "/500 characters"
            ] }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Separator, {}),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "visibility",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { className: "text-sm font-semibold text-bolt-elements-textPrimary", children: "Visibility" }),
            /* @__PURE__ */ jsx(FormDescription, { className: "mb-3", children: "Control who can find and collaborate on this project." }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: visibilityOptions.map((option) => {
              const Icon = option.icon;
              const isActive = field.value === option.value;
              return /* @__PURE__ */ jsxs(
                "label",
                {
                  className: classNames(
                    "group relative flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 shadow-sm transition-all",
                    {
                      "border-bolt-elements-borderColorActive bg-bolt-elements-button-primary-background/5": isActive,
                      "border-bolt-elements-borderColor/70 bg-bolt-elements-background-depth-2/80 hover:border-bolt-elements-borderColor hover:bg-bolt-elements-background-depth-1/90": !isActive
                    }
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        className: "sr-only",
                        value: option.value,
                        checked: isActive,
                        onChange: () => field.onChange(option.value),
                        disabled: form.formState.isSubmitting
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: classNames(
                              "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                              {
                                "bg-bolt-elements-button-primary-background/10 text-bolt-elements-button-primary-text": isActive,
                                "bg-bolt-elements-background-depth-1 text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary": !isActive
                              }
                            ),
                            children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-bolt-elements-textPrimary", children: option.label })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: classNames("h-4 w-4 rounded-full border-2 transition-all", {
                            "border-bolt-elements-button-primary-background bg-bolt-elements-button-primary-background": isActive,
                            "border-bolt-elements-borderColor": !isActive
                          }),
                          "aria-hidden": true,
                          children: isActive && /* @__PURE__ */ jsx("span", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-bolt-elements-button-primary-text" }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-bolt-elements-textSecondary", children: option.helper })
                  ]
                },
                option.value
              );
            }) }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 border-t border-bolt-elements-borderColor pt-5 sm:flex-row sm:justify-end", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            onClick: onClose,
            disabled: form.formState.isSubmitting,
            className: "sm:w-auto",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: form.formState.isSubmitting, className: "sm:w-auto", children: form.formState.isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader, { className: "h-4 w-4 animate-spin" }),
          "Creating project..."
        ] }) : "Create project" })
      ] })
    ] }) }) })
  ] }) });
}

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const projectSchema = z$1.object({
  name: z$1.string().min(1, "Project name is required").max(100, "Name is too long"),
  description: z$1.string().max(500, "Description is too long").optional(),
  visibility: z$1.enum(["private", "public"])
});
function EditProjectDialog({ project, open, onOpenChange, onSuccess }) {
  const form = useForm({
    resolver: zodResolver(projectSchema),
    values: project ? {
      name: project.name,
      description: project.description || "",
      visibility: project.visibility
    } : {
      name: "",
      description: "",
      visibility: "private"
    }
  });
  const onSubmit = async (data) => {
    if (!project) {
      return;
    }
    try {
      await projectService.updateProject(project.id, {
        name: data.name,
        description: data.description || null,
        visibility: data.visibility
      });
      toast.success("Project updated successfully");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error(`Failed to update project: ${error.message}`);
    }
  };
  return /* @__PURE__ */ jsx(Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs(Dialog, { className: "w-[95vw] max-w-[500px]", children: [
    /* @__PURE__ */ jsx(DialogTitle, { children: /* @__PURE__ */ jsx("span", { children: "Edit Project" }) }),
    /* @__PURE__ */ jsx(DialogDescription, { children: "Make changes to your project. Click save when you're done." }),
    /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "px-5 pb-5 space-y-4", children: [
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "name",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Project Name" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "My Awesome Project", ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "description",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Description (Optional)" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "A brief description of your project...",
                className: "resize-none",
                rows: 3,
                ...field
              }
            ) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "visibility",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Visibility" }),
            /* @__PURE__ */ jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select visibility" }) }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "private", children: "Private" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "public", children: "Public" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end pt-4 border-t border-bolt-elements-borderColor", children: [
        /* @__PURE__ */ jsx(DialogButton, { type: "secondary", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            disabled: form.formState.isSubmitting,
            className: "inline-flex h-[35px] items-center justify-center rounded-lg px-4 text-sm leading-none focus:outline-none bg-bolt-elements-button-primary-background text-bolt-elements-button-primary-text hover:bg-bolt-elements-button-primary-backgroundHover disabled:opacity-50 disabled:cursor-not-allowed",
            children: [
              form.formState.isSubmitting && /* @__PURE__ */ jsx(Loader, { className: "mr-2 h-4 w-4 animate-spin" }),
              "Save Changes"
            ]
          }
        )
      ] })
    ] }) })
  ] }) });
}

const cubicEasingFn = cubicBezier(0.4, 0, 0.2, 1);

const AlertDialog = AlertDialogPrimitive.Root;
const transition = {
  duration: 0.15,
  ease: cubicEasingFn
};
const backdropVariants = {
  closed: {
    opacity: 0,
    transition
  },
  open: {
    opacity: 1,
    transition
  }
};
const contentVariants = {
  closed: {
    x: "-50%",
    y: "-40%",
    scale: 0.96,
    opacity: 0,
    transition
  },
  open: {
    x: "-50%",
    y: "-50%",
    scale: 1,
    opacity: 1,
    transition
  }
};
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, { asChild: true, ...props, children: /* @__PURE__ */ jsx(
  motion.div,
  {
    ref,
    className: cn("fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm", className),
    initial: "closed",
    animate: "open",
    exit: "closed",
    variants: backdropVariants
  }
) }));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(AlertDialogPrimitive.Content, { asChild: true, ...props, children: /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-[999] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 shadow-2xl focus:outline-none",
        className
      ),
      initial: "closed",
      animate: "open",
      exit: "closed",
      variants: contentVariants,
      children
    }
  ) })
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-bolt-elements-textPrimary", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-bolt-elements-textSecondary", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textPrimary",
        primary: "border-transparent bg-bolt-elements-button-primary-background text-bolt-elements-button-primary-text shadow-sm",
        secondary: "border-transparent bg-bolt-elements-button-secondary-background text-bolt-elements-button-secondary-text",
        success: "border-transparent bg-green-500/15 text-green-600 dark:text-green-400",
        warning: "border-transparent bg-orange-500/15 text-orange-600 dark:text-orange-400",
        danger: "border-transparent bg-bolt-elements-button-danger-background/15 text-bolt-elements-button-danger-text",
        outline: "border-bolt-elements-borderColor bg-transparent text-bolt-elements-textSecondary"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 shadow-sm transition-all duration-300 hover:shadow-md",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "h3",
    {
      ref,
      className: cn("text-2xl font-semibold leading-none tracking-tight text-bolt-elements-textPrimary", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-bolt-elements-textSecondary", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[10rem] overflow-y-auto overflow-x-hidden rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2/95 p-2 text-bolt-elements-textPrimary shadow-xl backdrop-blur-md ring-1 ring-black/5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-2 text-sm text-bolt-elements-textPrimary outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-bolt-elements-background-depth-3 data-[highlighted]:text-bolt-elements-textPrimary data-[highlighted]:shadow-inner [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("my-2 h-px bg-bolt-elements-borderColor/80", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

function ProjectsList({ refreshTrigger } = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteProject, setDeleteProject] = useState(null);
  const [editProject, setEditProject] = useState(null);
  useEffect(() => {
    loadProjects();
  }, [refreshTrigger]);
  const loadProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (error) {
      toast.error(`Failed to load projects: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!deleteProject) {
      return;
    }
    try {
      await projectService.deleteProject(deleteProject.id);
      toast.success("Project deleted successfully");
      setDeleteProject(null);
      await loadProjects();
    } catch (error) {
      toast.error(`Failed to delete project: ${error.message}`);
    }
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  const getTimeAgo = (date) => {
    const now = /* @__PURE__ */ new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1e3);
    if (diffInSeconds < 60) {
      return "Just now";
    }
    if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    }
    if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    }
    if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }
    return formatDate(date);
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-[60vh] items-center justify-center p-12", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3 },
        className: "flex flex-col items-center gap-4",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 animate-ping rounded-full bg-bolt-elements-icon-primary opacity-20" }),
            /* @__PURE__ */ jsx("div", { className: "relative flex h-16 w-16 items-center justify-center rounded-full bg-bolt-elements-button-primary-background", children: /* @__PURE__ */ jsx(Loader, { className: "h-8 w-8 animate-spin text-bolt-elements-icon-primary" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-bolt-elements-textPrimary", children: "Loading your projects" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-bolt-elements-textSecondary", children: "Please wait..." })
          ] })
        ]
      }
    ) });
  }
  if (projects.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "flex flex-col items-center",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-bolt-elements-button-primary-background to-transparent opacity-20 blur-3xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex h-32 w-32 items-center justify-center rounded-3xl border border-bolt-elements-borderColor bg-gradient-to-br from-bolt-elements-background-depth-2 to-bolt-elements-background-depth-3 shadow-lg", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-3xl bg-gradient-to-br from-bolt-elements-button-primary-background to-transparent opacity-10" }),
              /* @__PURE__ */ jsx(FolderKanban, { className: "relative h-16 w-16 text-bolt-elements-icon-primary" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute -right-2 -top-2", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 text-bolt-elements-icon-primary animate-pulse" }) })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mb-3 text-2xl font-bold text-bolt-elements-textPrimary", children: "No projects yet" }),
          /* @__PURE__ */ jsx("p", { className: "mb-6 max-w-md text-base leading-relaxed text-bolt-elements-textSecondary", children: "Create your first project to start building with AI. Organize your work, collaborate with teammates, and bring your ideas to life." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 text-sm text-bolt-elements-textTertiary", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "h-1 w-1 rounded-full bg-bolt-elements-icon-primary" }),
              /* @__PURE__ */ jsx("span", { children: "AI-powered development" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "h-1 w-1 rounded-full bg-bolt-elements-icon-primary" }),
              /* @__PURE__ */ jsx("span", { children: "Real-time collaboration" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "h-1 w-1 rounded-full bg-bolt-elements-icon-primary" }),
              /* @__PURE__ */ jsx("span", { children: "Version control built-in" })
            ] })
          ] })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: projects.map((project, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: {
          duration: 0.4,
          delay: index * 0.05,
          ease: [0.16, 1, 0.3, 1]
        },
        className: "group",
        children: /* @__PURE__ */ jsx(
          Card,
          {
            className: cn(
              "relative h-full overflow-hidden border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-0 transition-all duration-300",
              "hover:border-bolt-elements-borderColorActive hover:shadow-lg hover:-translate-y-1",
              "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-bolt-elements-button-primary-background before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
            ),
            children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full flex-col p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-bolt-elements-button-primary-background", children: /* @__PURE__ */ jsx(FolderKanban, { className: "h-5 w-5 text-bolt-elements-icon-primary" }) }),
                    /* @__PURE__ */ jsx(Badge, { variant: project.visibility === "public" ? "success" : "default", className: "gap-1", children: project.visibility === "public" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Globe, { className: "h-3 w-3" }),
                      "Public"
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Lock, { className: "h-3 w-3" }),
                      "Private"
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "mb-2 truncate text-lg font-semibold text-bolt-elements-textPrimary group-hover:text-bolt-elements-icon-primary transition-colors", children: project.name }),
                  project.description && /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm leading-relaxed text-bolt-elements-textSecondary", children: project.description })
                ] }),
                /* @__PURE__ */ jsxs(DropdownMenu, { children: [
                  /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity",
                      children: [
                        /* @__PURE__ */ jsx(MoveVertical, { className: "h-4 w-4" }),
                        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open menu" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [
                    /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => toast.info("Open project functionality coming soon"), children: [
                      /* @__PURE__ */ jsx(FolderKanban, { className: "mr-2 h-4 w-4" }),
                      "Open Project"
                    ] }),
                    /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => setEditProject(project), children: [
                      /* @__PURE__ */ jsx(CreditCard, { className: "mr-2 h-4 w-4" }),
                      "Edit"
                    ] }),
                    /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => toast.info("Share functionality coming soon"), children: [
                      /* @__PURE__ */ jsx(Share2, { className: "mr-2 h-4 w-4" }),
                      "Share"
                    ] }),
                    /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                    /* @__PURE__ */ jsxs(
                      DropdownMenuItem,
                      {
                        onClick: () => setDeleteProject({ id: project.id, name: project.name }),
                        className: "text-bolt-elements-button-danger-text focus:text-bolt-elements-button-danger-text",
                        children: [
                          /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                          "Delete"
                        ]
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Separator, { className: "my-4" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-auto space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-bolt-elements-textTertiary", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Updated",
                    " ",
                    project.updated_at ? getTimeAgo(project.updated_at) : project.created_at ? getTimeAgo(project.created_at) : "Unknown"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-bolt-elements-textTertiary", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Created ",
                    project.created_at ? formatDate(project.created_at) : "Unknown"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    className: "flex-1 gap-2",
                    size: "sm",
                    onClick: () => toast.info("Open project functionality coming soon"),
                    children: [
                      /* @__PURE__ */ jsx(FolderKanban, { className: "h-4 w-4" }),
                      "Open"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "gap-2", onClick: () => setEditProject(project), children: /* @__PURE__ */ jsx(CreditCard, { className: "h-4 w-4" }) })
              ] })
            ] })
          }
        )
      },
      project.id
    )) }),
    /* @__PURE__ */ jsx(
      EditProjectDialog,
      {
        project: editProject,
        open: editProject !== null,
        onOpenChange: (open) => !open && setEditProject(null),
        onSuccess: loadProjects
      }
    ),
    deleteProject && /* @__PURE__ */ jsx(AlertDialog, { open: true, onOpenChange: (open) => !open && setDeleteProject(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsx(AlertDialogTitle, { className: "px-6 pt-6 text-lg font-semibold text-bolt-elements-textPrimary", children: "Delete Project?" }),
      /* @__PURE__ */ jsxs(AlertDialogDescription, { className: "px-6 pb-4 text-sm text-bolt-elements-textSecondary", children: [
        "You are about to permanently delete",
        " ",
        /* @__PURE__ */ jsx("strong", { className: "text-bolt-elements-textPrimary", children: deleteProject.name }),
        ". This action cannot be undone and all project data will be lost."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse gap-2 px-6 pb-6 sm:flex-row sm:justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { onClick: () => setDeleteProject(null), children: "Cancel" }),
        /* @__PURE__ */ jsxs(
          AlertDialogAction,
          {
            onClick: handleDelete,
            className: cn(
              "bg-bolt-elements-button-danger-background text-bolt-elements-button-danger-text hover:bg-bolt-elements-button-danger-backgroundHover"
            ),
            children: [
              /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
              "Delete Project"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}

function ProjectsPage() {
  const { user, loading } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-center justify-center bg-bolt-elements-background-depth-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 px-6 py-4 shadow-sm", children: [
      /* @__PURE__ */ jsx(Loader, { className: "h-5 w-5 animate-spin text-bolt-elements-textSecondary" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-bolt-elements-textPrimary", children: "Loading your workspace..." })
    ] }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsx("div", { className: "flex h-screen flex-col items-center justify-center bg-gradient-to-b from-bolt-elements-background-depth-1 to-bolt-elements-background-depth-2 p-4", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 p-8 shadow-2xl sm:p-12", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-bolt-elements-button-primary-background/10 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-bolt-elements-button-primary-background/5 blur-2xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-bolt-elements-button-primary-background to-bolt-elements-button-primary-backgroundHover shadow-lg shadow-bolt-elements-button-primary-background/20", children: /* @__PURE__ */ jsx(KeyRound, { className: "h-10 w-10 text-bolt-elements-button-primary-text" }) }),
        /* @__PURE__ */ jsx("h1", { className: "mb-3 text-2xl font-bold text-bolt-elements-textPrimary sm:text-3xl", children: "Sign in to access projects" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 max-w-md text-sm text-bolt-elements-textSecondary sm:text-base", children: "Sign in to view and manage your AI-powered projects, collaborate with your team, and sync across devices." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "shadow-md", children: /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" }),
          "Go to Home"
        ] }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-b from-bolt-elements-background-depth-1 to-bolt-elements-background-depth-2", children: [
    /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsx(Menu, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-10 border-b border-bolt-elements-borderColor bg-bolt-elements-background-depth-1/95 px-6 py-5 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-bolt-elements-textPrimary sm:text-3xl", children: "My Projects" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-full border border-bolt-elements-borderColor/60 bg-bolt-elements-background-depth-2 px-3 py-1 text-xs font-medium text-bolt-elements-textSecondary", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
              "AI-Powered"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-bolt-elements-textSecondary", children: "Manage your AI-generated projects and collaborate with your team" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => setCreateDialogOpen(true), size: "lg", className: "shadow-sm", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" }),
          "New Project"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(ClientOnly, { children: () => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(ProjectsList, { refreshTrigger }),
        /* @__PURE__ */ jsx(
          CreateProjectDialog,
          {
            open: createDialogOpen,
            onClose: () => setCreateDialogOpen(false),
            onCreated: () => {
              setRefreshTrigger((prev) => prev + 1);
            }
          }
        )
      ] }) })
    ] })
  ] });
}

const route7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: ProjectsPage
}, Symbol.toStringTag, { value: 'Module' }));

const logger = createScopedLogger("MigrationSettings");
function MigrationSettings() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    loadLocalChats();
  }, []);
  const loadLocalChats = async () => {
    setLoading(true);
    try {
      const db = await openDatabase();
      if (!db) {
        toast.error("Could not access local database");
        setLoading(false);
        return;
      }
      const localChats = await getAll(db);
      if (user) {
        const supabase = createClient();
        const { data: existingChats } = await supabase.from("chats").select("url_id").eq("user_id", user.id);
        const existingUrlIds = new Set(existingChats?.map((c) => c.url_id) || []);
        const chatStatuses = localChats.map((chat) => ({
          chat,
          selected: false,
          status: existingUrlIds.has(chat.urlId || chat.id) ? "success" : "pending"
        }));
        setChats(chatStatuses);
      } else {
        const chatStatuses = localChats.map((chat) => ({
          chat,
          selected: false,
          status: "pending"
        }));
        setChats(chatStatuses);
      }
    } catch (error) {
      logger.error("Failed to load local chats:", error);
      toast.error("Failed to load local chats");
    } finally {
      setLoading(false);
    }
  };
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setChats(
      chats.map((chat) => ({
        ...chat,
        selected: chat.status === "pending" ? newSelectAll : chat.selected
      }))
    );
  };
  const toggleChatSelection = (index) => {
    setChats(
      chats.map((chat, i) => i === index && chat.status === "pending" ? { ...chat, selected: !chat.selected } : chat)
    );
  };
  const migrateSelected = async () => {
    if (!user) {
      toast.error("You must be logged in to migrate chats");
      return;
    }
    const selectedChats = chats.filter((c) => c.selected);
    if (selectedChats.length === 0) {
      toast.info("Please select at least one chat to migrate");
      return;
    }
    setMigrating(true);
    const supabase = createClient();
    let successCount = 0;
    let errorCount = 0;
    for (const chatStatus of selectedChats) {
      const index = chats.indexOf(chatStatus);
      setChats((prev) => prev.map((c, i) => i === index ? { ...c, status: "migrating" } : c));
      try {
        const { chat } = chatStatus;
        const urlId = chat.urlId || chat.id;
        const { error } = await supabase.from("chats").upsert(
          {
            user_id: user.id,
            url_id: urlId,
            description: chat.description || null,
            messages: chat.messages,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            onConflict: "url_id,user_id"
          }
        );
        if (error) {
          throw error;
        }
        setChats(
          (prev) => prev.map((c, i) => i === index ? { ...c, status: "success", selected: false } : c)
        );
        successCount++;
      } catch (error) {
        logger.error(`Failed to migrate chat ${chatStatus.chat.id}:`, error);
        setChats(
          (prev) => prev.map(
            (c, i) => i === index ? { ...c, status: "error", error: error.message, selected: false } : c
          )
        );
        errorCount++;
      }
    }
    setMigrating(false);
    if (successCount > 0) {
      toast.success(`Successfully migrated ${successCount} chat${successCount > 1 ? "s" : ""}!`);
    }
    if (errorCount > 0) {
      toast.error(`Failed to migrate ${errorCount} chat${errorCount > 1 ? "s" : ""}`);
    }
  };
  const selectedCount = chats.filter((c) => c.selected).length;
  const pendingChats = chats.filter((c) => c.status === "pending");
  const migratedChats = chats.filter((c) => c.status === "success");
  if (!user) {
    return /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(Database, { className: "mx-auto h-12 w-12 text-bolt-elements-textTertiary" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-4 text-base font-semibold text-bolt-elements-textPrimary", children: "Sign in to migrate chats" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-bolt-elements-textSecondary", children: "You must be logged in to migrate your local chats to the cloud." })
    ] }) });
  }
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(Loader, { className: "h-5 w-5 animate-spin text-bolt-elements-textSecondary" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-bolt-elements-textSecondary", children: "Loading local chats..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Database, { className: "h-4 w-4 text-bolt-elements-textSecondary" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-bolt-elements-textSecondary", children: "Local" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-2xl font-bold text-bolt-elements-textPrimary", children: chats.length })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Cloud, { className: "h-4 w-4 text-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-bolt-elements-textSecondary", children: "Migrated" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-2xl font-bold text-green-500", children: migratedChats.length })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 text-yellow-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-bolt-elements-textSecondary", children: "Pending" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-2xl font-bold text-yellow-500", children: pendingChats.length })
      ] })
    ] }),
    pendingChats.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: selectAll,
            onChange: toggleSelectAll,
            className: "h-4 w-4 rounded border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-bolt-elements-button-primary-background focus:ring-2 focus:ring-bolt-elements-button-primary-background"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-bolt-elements-textPrimary", children: selectedCount > 0 ? `${selectedCount} selected` : "Select all pending" })
      ] }),
      /* @__PURE__ */ jsx(Button, { onClick: migrateSelected, disabled: selectedCount === 0 || migrating, size: "sm", children: migrating ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Loader, { className: "h-4 w-4 animate-spin" }),
        "Migrating..."
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
        "Migrate Selected"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: chats.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-8 text-center", children: [
      /* @__PURE__ */ jsx(Database, { className: "mx-auto h-12 w-12 text-bolt-elements-textTertiary" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-4 text-base font-semibold text-bolt-elements-textPrimary", children: "No local chats found" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-bolt-elements-textSecondary", children: "All your chats are already synced to the cloud!" })
    ] }) : chats.map((chatStatus, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex items-center gap-3 rounded-lg border p-4 transition-colors ${chatStatus.status === "success" ? "border-green-500/20 bg-green-500/5" : chatStatus.status === "error" ? "border-red-500/20 bg-red-500/5" : "border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:bg-bolt-elements-background-depth-3"}`,
        children: [
          chatStatus.status === "pending" && /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: chatStatus.selected,
              onChange: () => toggleChatSelection(index),
              className: "h-4 w-4 rounded border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-bolt-elements-button-primary-background focus:ring-2 focus:ring-bolt-elements-button-primary-background"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("h4", { className: "truncate text-sm font-medium text-bolt-elements-textPrimary", children: chatStatus.chat.description || chatStatus.chat.urlId || chatStatus.chat.id }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-bolt-elements-textSecondary", children: [
              chatStatus.chat.messages.length,
              " message",
              chatStatus.chat.messages.length !== 1 ? "s" : "",
              " •",
              " ",
              new Date(chatStatus.chat.timestamp).toLocaleDateString()
            ] }),
            chatStatus.error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: chatStatus.error })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0", children: [
            chatStatus.status === "migrating" && /* @__PURE__ */ jsx(Loader, { className: "h-5 w-5 animate-spin text-bolt-elements-textSecondary" }),
            chatStatus.status === "success" && /* @__PURE__ */ jsx(CircleCheck, { className: "h-5 w-5 text-green-500" }),
            chatStatus.status === "error" && /* @__PURE__ */ jsx(Circle, { className: "h-5 w-5 text-red-500" })
          ] })
        ]
      },
      chatStatus.chat.id
    )) })
  ] });
}

const TooltipProvider = Tooltip$1.Provider;
const TooltipRoot = Tooltip$1.Root;
const TooltipTrigger = Tooltip$1.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(Tooltip$1.Portal, { children: /* @__PURE__ */ jsx(
  Tooltip$1.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 px-3 py-2 text-xs text-bolt-elements-textPrimary shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = Tooltip$1.Content.displayName;
function Tooltip({ content, children, delayDuration = 200, side = "top" }) {
  return /* @__PURE__ */ jsx(TooltipProvider, { delayDuration, children: /* @__PURE__ */ jsxs(TooltipRoot, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(TooltipContent, { side, children: content })
  ] }) });
}

function SettingItem({ label, description, tooltip, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 px-4 py-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-bolt-elements-textPrimary", children: label }),
        tooltip && /* @__PURE__ */ jsx(Tooltip, { content: tooltip, side: "right", children: /* @__PURE__ */ jsx("button", { type: "button", className: "text-bolt-elements-textTertiary hover:text-bolt-elements-textSecondary", children: /* @__PURE__ */ jsx(Circle, { className: "h-4 w-4" }) }) })
      ] }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-bolt-elements-textSecondary", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ml-4", children })
  ] });
}

function SettingsSection({ title, description, status, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "border-b border-bolt-elements-borderColor pb-8 last:border-b-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-bolt-elements-textPrimary", children: title }),
        status === "coming-soon" && /* @__PURE__ */ jsx(Badge, { variant: "warning", className: "text-xs", children: "Coming Soon" }),
        status === "partial" && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: "Partially Implemented" }),
        status === "implemented" && /* @__PURE__ */ jsx(Badge, { variant: "success", className: "text-xs", children: "Active" })
      ] }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-bolt-elements-textSecondary", children: description }),
      status === "coming-soon" && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-bolt-elements-textTertiary italic", children: "These settings are saved but not yet connected to functionality." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children })
  ] });
}

function Switch({ checked, onChange, disabled = false, className }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled,
      onClick: () => !disabled && onChange(!checked),
      className: classNames(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bolt-elements-button-primary-background focus-visible:ring-offset-2 focus-visible:ring-offset-bolt-elements-background-depth-1",
        {
          "bg-bolt-elements-button-primary-background": checked && !disabled,
          "bg-bolt-elements-background-depth-3": !checked && !disabled,
          "opacity-50 cursor-not-allowed": disabled
        },
        className
      ),
      children: /* @__PURE__ */ jsx(
        "span",
        {
          className: classNames("inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform", {
            "translate-x-6": checked,
            "translate-x-1": !checked
          })
        }
      )
    }
  );
}

const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const shortcutsStore = map({
  toggleTerminal: {
    key: "j",
    ctrlOrMetaKey: true,
    action: () => workbenchStore.toggleTerminal()
  }
});
const defaultEditorSettings = {
  tabSize: 2,
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  lineHeight: 1.5,
  wordWrap: true,
  minimap: true,
  lineNumbers: true
};
const defaultAISettings = {
  model: "claude-sonnet-3.5",
  temperature: 0.7,
  maxTokens: 8192,
  streamResponse: true
};
const defaultUserPreferences = {
  language: "en",
  notifications: true,
  autoSave: true,
  autoSaveDelay: 1e3
};
const settingsStore = map({
  shortcuts: shortcutsStore.get(),
  editor: defaultEditorSettings,
  ai: defaultAISettings,
  preferences: defaultUserPreferences
});
shortcutsStore.subscribe((shortcuts) => {
  settingsStore.set({
    ...settingsStore.get(),
    shortcuts
  });
});
function updateEditorSettings(updates) {
  const currentSettings = settingsStore.get();
  settingsStore.set({
    ...currentSettings,
    editor: { ...currentSettings.editor, ...updates }
  });
}
function updateAISettings(updates) {
  const currentSettings = settingsStore.get();
  settingsStore.set({
    ...currentSettings,
    ai: { ...currentSettings.ai, ...updates }
  });
}
function updateUserPreferences(updates) {
  const currentSettings = settingsStore.get();
  settingsStore.set({
    ...currentSettings,
    preferences: { ...currentSettings.preferences, ...updates }
  });
}

function getAvatarUrl(user, fallbackColor = "8b5cf6", useProxy = false) {
  let avatarUrl = null;
  if (user.user_metadata?.avatar_url) {
    avatarUrl = user.user_metadata.avatar_url;
  } else if (user.identities) {
    const googleIdentity = user.identities.find((identity) => identity.provider === "google");
    if (googleIdentity?.identity_data?.picture) {
      avatarUrl = googleIdentity.identity_data.picture;
    } else {
      const githubIdentity = user.identities.find((identity) => identity.provider === "github");
      if (githubIdentity?.identity_data?.avatar_url) {
        avatarUrl = githubIdentity.identity_data.avatar_url;
      }
    }
  } else if (user.user_metadata?.picture) {
    avatarUrl = user.user_metadata.picture;
  } else if (user.user_metadata?.photo) {
    avatarUrl = user.user_metadata.photo;
  }
  if (avatarUrl && useProxy) {
    return `/api/avatar?url=${encodeURIComponent(avatarUrl)}`;
  } else if (avatarUrl) {
    return avatarUrl;
  }
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || "User")}&background=${fallbackColor}&color=fff&bold=true`;
  return useProxy ? `/api/avatar?url=${encodeURIComponent(fallbackUrl)}` : fallbackUrl;
}

function SettingsPage() {
  const { user } = useAuth();
  const settings = useStore(settingsStore);
  const [isSaving, setIsSaving] = useState(false);
  const handleEditorSettingChange = (key, value) => {
    updateEditorSettings({ [key]: value });
  };
  const handleAISettingChange = (key, value) => {
    updateAISettings({ [key]: value });
  };
  const handlePreferenceChange = (key, value) => {
    updateUserPreferences({ [key]: value });
  };
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };
  const profileSection = user && /* @__PURE__ */ jsx(SettingsSection, { title: "Profile", description: "Manage your account information", status: "partial", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: getAvatarUrl(user),
        alt: user.email || "User",
        className: "h-16 w-16 rounded-full ring-2 ring-bolt-elements-borderColor"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-bolt-elements-textPrimary", children: user.user_metadata?.name || user.email?.split("@")[0] || "User" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-bolt-elements-textSecondary", children: user.email })
    ] }),
    /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "sm", children: [
      /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
      "Edit Profile"
    ] })
  ] }) }) });
  const editorSection = /* @__PURE__ */ jsxs(SettingsSection, { title: "Editor", description: "Customize your code editor preferences", status: "coming-soon", children: [
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Tab Size",
        description: "Number of spaces per tab",
        tooltip: "Controls how many spaces are inserted when you press the Tab key. Common values are 2 or 4 spaces.",
        children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            min: 2,
            max: 8,
            value: settings.editor.tabSize,
            onChange: (e) => handleEditorSettingChange("tabSize", parseInt(e.target.value, 10)),
            className: "w-20"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Font Size",
        description: "Editor font size in pixels",
        tooltip: "Adjusts the size of text in the code editor. Larger values make text easier to read, smaller values fit more code on screen.",
        children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            min: 10,
            max: 24,
            value: settings.editor.fontSize,
            onChange: (e) => handleEditorSettingChange("fontSize", parseInt(e.target.value, 10)),
            className: "w-20"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Line Height",
        description: "Line height multiplier",
        tooltip: "Controls the vertical spacing between lines of code. Higher values (1.5-2.0) improve readability, lower values (1.0-1.3) fit more code on screen.",
        children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            min: 1,
            max: 2,
            step: 0.1,
            value: settings.editor.lineHeight,
            onChange: (e) => handleEditorSettingChange("lineHeight", parseFloat(e.target.value)),
            className: "w-20"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Word Wrap",
        description: "Wrap long lines",
        tooltip: "When enabled, long lines of code will automatically wrap to the next line instead of requiring horizontal scrolling.",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            checked: settings.editor.wordWrap,
            onChange: (checked) => handleEditorSettingChange("wordWrap", checked)
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Minimap",
        description: "Show code minimap",
        tooltip: "Displays a small overview of your entire file on the right side of the editor, making it easier to navigate large files.",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            checked: settings.editor.minimap,
            onChange: (checked) => handleEditorSettingChange("minimap", checked)
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Line Numbers",
        description: "Show line numbers",
        tooltip: "Displays line numbers in the left gutter of the editor, useful for referencing specific lines and debugging.",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            checked: settings.editor.lineNumbers,
            onChange: (checked) => handleEditorSettingChange("lineNumbers", checked)
          }
        )
      }
    )
  ] });
  const aiSection = /* @__PURE__ */ jsxs(SettingsSection, { title: "AI Assistant", description: "Configure AI model and behavior", status: "coming-soon", children: [
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Temperature",
        description: "Controls randomness (0-1)",
        tooltip: "Lower values (0.0-0.3) make responses more focused and deterministic. Higher values (0.7-1.0) make responses more creative and varied.",
        children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            min: 0,
            max: 1,
            step: 0.1,
            value: settings.ai.temperature,
            onChange: (e) => handleAISettingChange("temperature", parseFloat(e.target.value)),
            className: "w-20"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Max Tokens",
        description: "Maximum response length",
        tooltip: "Limits the length of AI responses. Higher values allow longer responses but use more resources. 1 token ≈ 4 characters.",
        children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            min: 1024,
            max: 32768,
            step: 1024,
            value: settings.ai.maxTokens,
            onChange: (e) => handleAISettingChange("maxTokens", parseInt(e.target.value, 10)),
            className: "w-24"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Stream Response",
        description: "Stream AI responses in real-time",
        tooltip: "When enabled, AI responses appear word-by-word as they're generated. When disabled, the full response appears at once.",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            checked: settings.ai.streamResponse,
            onChange: (checked) => handleAISettingChange("streamResponse", checked)
          }
        )
      }
    )
  ] });
  const preferencesSection = /* @__PURE__ */ jsxs(SettingsSection, { title: "Preferences", description: "General application settings", status: "coming-soon", children: [
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Notifications",
        description: "Enable browser notifications",
        tooltip: "Receive desktop notifications for important events and updates. Your browser may ask for permission.",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            checked: settings.preferences.notifications,
            onChange: (checked) => handlePreferenceChange("notifications", checked)
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Auto Save",
        description: "Automatically save changes",
        tooltip: "Automatically saves your work as you type. Prevents data loss from browser crashes or accidental closures.",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            checked: settings.preferences.autoSave,
            onChange: (checked) => handlePreferenceChange("autoSave", checked)
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      SettingItem,
      {
        label: "Auto Save Delay",
        description: "Delay before auto-saving (ms)",
        tooltip: "Time to wait after you stop typing before auto-save triggers. Lower values save more frequently but may impact performance.",
        children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            min: 500,
            max: 5e3,
            step: 500,
            value: settings.preferences.autoSaveDelay,
            onChange: (e) => handlePreferenceChange("autoSaveDelay", parseInt(e.target.value, 10)),
            className: "w-24",
            disabled: !settings.preferences.autoSave
          }
        )
      }
    )
  ] });
  const migrationSection = /* @__PURE__ */ jsx(
    SettingsSection,
    {
      title: "Data Migration",
      description: "Migrate your local chats to cloud storage",
      status: "implemented",
      children: /* @__PURE__ */ jsx(MigrationSettings, {})
    }
  );
  const accountSection = /* @__PURE__ */ jsx(SettingsSection, { title: "Account", description: "Manage your account", status: "coming-soon", children: /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-bolt-elements-button-danger-background/20 bg-bolt-elements-button-danger-background/5 p-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-2 text-base font-semibold text-bolt-elements-textPrimary", children: "Danger Zone" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-bolt-elements-textSecondary", children: "Permanently delete your account and all associated data. This action cannot be undone." }),
    /* @__PURE__ */ jsx(Button, { variant: "danger", size: "sm", children: "Delete Account" })
  ] }) });
  const tabSections = [];
  if (profileSection) {
    tabSections.push({ value: "profile", label: "Profile", content: profileSection });
  }
  tabSections.push(
    { value: "editor", label: "Editor", content: editorSection },
    { value: "ai-assistant", label: "AI Assistant", content: aiSection },
    { value: "preferences", label: "Preferences", content: preferencesSection },
    { value: "data-migration", label: "Data Migration", content: migrationSection },
    { value: "account", label: "Account", content: accountSection }
  );
  const defaultTab = tabSections[0]?.value ?? "editor";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-bolt-elements-background-depth-1", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-10 border-b border-bolt-elements-borderColor bg-bolt-elements-background-depth-1/95 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/",
            className: "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-bolt-elements-textSecondary transition-colors hover:bg-bolt-elements-background-depth-2 hover:text-bolt-elements-textPrimary",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Back"
            ]
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-bolt-elements-textPrimary", children: "Settings" })
      ] }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSaveSettings, disabled: isSaving, children: isSaving ? "Saving..." : "Save Changes" })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-6 py-8", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "h-5 w-5 text-blue-600 dark:text-blue-500",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-blue-600 dark:text-blue-500", children: "Settings Implementation Status" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-blue-600/80 dark:text-blue-500/80", children: `The settings UI is complete and functional. Settings marked as "Coming Soon" are saved to your session but not yet connected to the application features. Settings marked as "Partial" have limited functionality. We're actively working on connecting all settings to their respective features.` })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: defaultTab, className: "space-y-6", children: [
        /* @__PURE__ */ jsx(TabsList, { className: "w-full justify-start gap-1 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2/60 p-1 text-bolt-elements-textSecondary", children: tabSections.map((section) => /* @__PURE__ */ jsx(
          TabsTrigger,
          {
            value: section.value,
            className: "rounded-md px-3 py-2 text-sm font-medium text-bolt-elements-textSecondary transition-colors data-[state=active]:bg-bolt-elements-background-depth-1 data-[state=active]:text-bolt-elements-textPrimary",
            children: section.label
          },
          section.value
        )) }),
        tabSections.map((section) => /* @__PURE__ */ jsx(TabsContent, { value: section.value, className: "mt-6", children: section.content }, section.value))
      ] })
    ] })
  ] });
}

function SettingsRoute() {
  const { user, loading } = useAuth();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-center justify-center bg-bolt-elements-background-depth-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 px-6 py-4 shadow-sm", children: [
      /* @__PURE__ */ jsx(Loader, { className: "h-5 w-5 animate-spin text-bolt-elements-textSecondary" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-bolt-elements-textPrimary", children: "Loading settings..." })
    ] }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsx("div", { className: "flex h-screen flex-col items-center justify-center bg-gradient-to-b from-bolt-elements-background-depth-1 to-bolt-elements-background-depth-2 p-4", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 p-8 shadow-2xl sm:p-12", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-bolt-elements-button-primary-background/10 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-bolt-elements-button-primary-background/5 blur-2xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-bolt-elements-button-primary-background to-bolt-elements-button-primary-backgroundHover shadow-lg shadow-bolt-elements-button-primary-background/20", children: /* @__PURE__ */ jsx(Settings, { className: "h-10 w-10 text-bolt-elements-button-primary-text" }) }),
        /* @__PURE__ */ jsx("h1", { className: "mb-3 text-2xl font-bold text-bolt-elements-textPrimary sm:text-3xl", children: "Sign in to access settings" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 max-w-md text-sm text-bolt-elements-textSecondary sm:text-base", children: "Sign in to customize your preferences, configure the editor, and manage your account settings." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "shadow-md", children: /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" }),
          "Go to Home"
        ] }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx(ClientOnly, { fallback: /* @__PURE__ */ jsx("div", { className: "flex h-screen items-center justify-center bg-bolt-elements-background-depth-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 px-6 py-4 shadow-sm", children: [
    /* @__PURE__ */ jsx(Loader, { className: "h-5 w-5 animate-spin text-bolt-elements-textSecondary" }),
    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-bolt-elements-textPrimary", children: "Loading settings..." })
  ] }) }), children: () => /* @__PURE__ */ jsx(SettingsPage, {}) });
}

const route8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: SettingsRoute
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-RBCuHk1v.js','imports':['/assets/index-CGEjQS6I.js','/assets/components-B0CCB4Sw.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/root-Dzk3gSJ7.js','imports':['/assets/index-CGEjQS6I.js','/assets/components-B0CCB4Sw.js','/assets/AuthContext-IShyyPOD.js','/assets/theme-B5OKuoap.js'],'css':['/assets/root-F1NdWHNd.css']},'routes/api.supabase-test':{'id':'routes/api.supabase-test','parentId':'root','path':'api/supabase-test','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/api.supabase-test-l0sNRNKZ.js','imports':[],'css':[]},'routes/auth.callback':{'id':'routes/auth.callback','parentId':'root','path':'auth/callback','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/auth.callback-l0sNRNKZ.js','imports':[],'css':[]},'routes/api.enhancer':{'id':'routes/api.enhancer','parentId':'root','path':'api/enhancer','index':undefined,'caseSensitive':undefined,'hasAction':true,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/api.enhancer-l0sNRNKZ.js','imports':[],'css':[]},'routes/api.avatar':{'id':'routes/api.avatar','parentId':'root','path':'api/avatar','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/api.avatar-l0sNRNKZ.js','imports':[],'css':[]},'routes/api.chat':{'id':'routes/api.chat','parentId':'root','path':'api/chat','index':undefined,'caseSensitive':undefined,'hasAction':true,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/api.chat-l0sNRNKZ.js','imports':[],'css':[]},'routes/chat.$id':{'id':'routes/chat.$id','parentId':'root','path':'chat/:id','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/chat._id-Q00vUDzu.js','imports':['/assets/_index-CzT6tV1y.js','/assets/index-CGEjQS6I.js','/assets/index-CNtwGs-4.js','/assets/AuthContext-IShyyPOD.js','/assets/index-Cp0ATWKs.js','/assets/theme-B5OKuoap.js','/assets/components-B0CCB4Sw.js','/assets/index-DDbUPmhG.js'],'css':['/assets/_index-aOrWPGfJ.css']},'routes/projects':{'id':'routes/projects','parentId':'root','path':'projects','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/projects-IePL7n8i.js','imports':['/assets/index-CGEjQS6I.js','/assets/index-CNtwGs-4.js','/assets/index-Cp0ATWKs.js','/assets/AuthContext-IShyyPOD.js','/assets/Badge-64GebnGr.js','/assets/theme-B5OKuoap.js','/assets/components-B0CCB4Sw.js'],'css':[]},'routes/settings':{'id':'routes/settings','parentId':'root','path':'settings','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/settings-CKN920gz.js','imports':['/assets/index-CGEjQS6I.js','/assets/index-CNtwGs-4.js','/assets/AuthContext-IShyyPOD.js','/assets/index-DDbUPmhG.js','/assets/Badge-64GebnGr.js'],'css':[]},'routes/_index':{'id':'routes/_index','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasErrorBoundary':false,'module':'/assets/_index-CJJxBI9r.js','imports':['/assets/_index-CzT6tV1y.js','/assets/index-CGEjQS6I.js','/assets/index-CNtwGs-4.js','/assets/AuthContext-IShyyPOD.js','/assets/index-Cp0ATWKs.js','/assets/theme-B5OKuoap.js','/assets/components-B0CCB4Sw.js','/assets/index-DDbUPmhG.js'],'css':['/assets/_index-aOrWPGfJ.css']}},'url':'/assets/manifest-c7875704.js','version':'c7875704'};

/**
       * `mode` is only relevant for the old Remix compiler but
       * is included here to satisfy the `ServerBuild` typings.
       */
      const mode = "production";
      const assetsBuildDirectory = "build\\client";
      const basename = "/";
      const future = {"v3_fetcherPersist":true,"v3_relativeSplatPath":true,"v3_throwAbortReason":true,"v3_routeConfig":false,"v3_singleFetch":false,"v3_lazyRouteDiscovery":false,"unstable_optimizeDeps":false};
      const isSpaMode = false;
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "routes/api.supabase-test": {
          id: "routes/api.supabase-test",
          parentId: "root",
          path: "api/supabase-test",
          index: undefined,
          caseSensitive: undefined,
          module: route1
        },
  "routes/auth.callback": {
          id: "routes/auth.callback",
          parentId: "root",
          path: "auth/callback",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        },
  "routes/api.enhancer": {
          id: "routes/api.enhancer",
          parentId: "root",
          path: "api/enhancer",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        },
  "routes/api.avatar": {
          id: "routes/api.avatar",
          parentId: "root",
          path: "api/avatar",
          index: undefined,
          caseSensitive: undefined,
          module: route4
        },
  "routes/api.chat": {
          id: "routes/api.chat",
          parentId: "root",
          path: "api/chat",
          index: undefined,
          caseSensitive: undefined,
          module: route5
        },
  "routes/chat.$id": {
          id: "routes/chat.$id",
          parentId: "root",
          path: "chat/:id",
          index: undefined,
          caseSensitive: undefined,
          module: route6
        },
  "routes/projects": {
          id: "routes/projects",
          parentId: "root",
          path: "projects",
          index: undefined,
          caseSensitive: undefined,
          module: route7
        },
  "routes/settings": {
          id: "routes/settings",
          parentId: "root",
          path: "settings",
          index: undefined,
          caseSensitive: undefined,
          module: route8
        },
  "routes/_index": {
          id: "routes/_index",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route9
        }
      };

export { serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, mode, publicPath, routes };
