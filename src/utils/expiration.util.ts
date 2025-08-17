export class ExpirationUtil {
  private static readonly TIME_UNITS: Record<string, number> = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
  };

  /**
   * Convierte un string como '15m' o '2h' en segundos.
   * @param value Ej: '30s', '10m', '2h', '7d'
   * @returns número de segundos, o 0 si el formato es inválido
   */
  static parse(value?: string): number {
    if (!value || value.length < 2) return 0;

    const unit = value.slice(-1);
    const amount = parseInt(value.slice(0, -1), 10);

    if (isNaN(amount)) return 0;

    return this.TIME_UNITS[unit] ? amount * this.TIME_UNITS[unit] : 0;
  }
}