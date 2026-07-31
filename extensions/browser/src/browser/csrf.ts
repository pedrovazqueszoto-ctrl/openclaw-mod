export function browserMutationGuardMiddleware(): (
  req: unknown,
  res: unknown,
  next: () => void,
) => void {
  return (_req: unknown, _res: unknown, next: () => void) => {
    next();
  };
}
