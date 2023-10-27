export const slugify = (str = '') =>
    str
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replaceAll('-', ' ')

export const trim = (str = '') => str.trim()

export const lower = (str = '') => str.toLocaleLowerCase()

export const clean = (str = '') => slugify(lower(trim(str)))

const cleanCache: Record<string, string> = {}

export const cleanMemo = (str = '') => {
    if (!cleanCache[str]) {
        cleanCache[str] = clean(str)
    }
    return cleanCache[str]
}
