export class ExecMindError extends Error {
  public status?: number;
  public code?: string;
  constructor(message: string, opts?: { status?: number; code?: string }) {
    super(message);
    this.name = "ExecMindError";
    this.status = opts?.status;
    this.code = opts?.code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class AuthError extends ExecMindError {
  constructor(message = "Authentication failed") {
    super(message, { status: 401, code: "auth_error" });
    this.name = "AuthError";
  }
}

export class RateLimitError extends ExecMindError {
  constructor(message = "Rate limited") {
    super(message, { status: 429, code: "rate_limit" });
    this.name = "RateLimitError";
  }
}

export class ValidationError extends ExecMindError {
  constructor(message = "Validation failed") {
    super(message, { status: 400, code: "validation_error" });
    this.name = "ValidationError";
  }
}

export class NetworkError extends ExecMindError {
  constructor(message = "Network error") {
    super(message, { code: "network_error" });
    this.name = "NetworkError";
  }
}
