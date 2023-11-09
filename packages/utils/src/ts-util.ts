type Enumerate<T extends number, R extends number[] = []> = R['length'] extends T ? R[number] : Enumerate<T, [R['length'], ...R]>

export type RangeNumber<Min extends number, Max extends number> = Exclude<Enumerate<Max>, Enumerate<Min>>
// type r3 = RangeNumber<2, 5> // 2 | 3 | 4

// Max exclude
export type RangeMaxInclude<Min extends number, Max extends number> = Exclude<Enumerate<Max> | Max, Enumerate<Min>>
// type r4 = RangeMaxInclude<2, 5> // 2 | 3 | 4 | 5
// Min exclude
export type RangeMinExclude<Min extends number, Max extends number> = Exclude<Enumerate<Max>, Enumerate<Min> | Min>
// type r5 = RangeMinExclude<2, 5> // 3 | 4

export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };
// type r6 = Tuple<number, 2> // [1, 1]
