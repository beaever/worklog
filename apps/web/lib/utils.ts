/**
 * UUID v4 생성 함수
 * crypto.randomUUID()가 지원되지 않는 환경(비보안 컨텍스트)에서도 동작
 */
export function generateUUID(): string {
  // crypto.randomUUID()가 지원되면 사용 (secure context에서만 가능)
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    try {
      return crypto.randomUUID();
    } catch {
      // secure context가 아닌 경우 폴백
    }
  }

  // 폴백: crypto.getRandomValues() 사용 (더 넓은 환경에서 지원)
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // UUID v4 형식으로 변환
    const byte6 = bytes[6];
    const byte8 = bytes[8];
    if (byte6 !== undefined && byte8 !== undefined) {
      bytes[6] = (byte6 & 0x0f) | 0x40; // version 4
      bytes[8] = (byte8 & 0x3f) | 0x80; // variant
    }

    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  // 최후의 폴백: Math.random() 사용 (보안에 민감하지 않은 경우)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
