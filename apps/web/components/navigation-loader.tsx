'use client';

/**
 * 모바일 WebView에 로딩 상태를 전달하는 유틸리티
 * API 호출, 화면 전환 등 필요한 곳에서 명시적으로 호출
 */

function sendMessageToWebView(type: string, payload?: unknown) {
  if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }));
  }
}

/**
 * 로딩 시작 - API 호출, 화면 전환 등 로딩이 필요할 때 호출
 */
export function showLoading() {
  sendMessageToWebView('LOADING_START');
}

/**
 * 로딩 종료 - 로딩이 완료되었을 때 호출
 */
export function hideLoading() {
  sendMessageToWebView('LOADING_END');
}

/**
 * 로딩 상태를 감싸는 래퍼 함수
 * Promise를 받아서 로딩 시작/종료를 자동으로 처리
 */
export async function withLoading<T>(promise: Promise<T>): Promise<T> {
  showLoading();
  try {
    return await promise;
  } finally {
    hideLoading();
  }
}

// TypeScript 타입 확장
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
