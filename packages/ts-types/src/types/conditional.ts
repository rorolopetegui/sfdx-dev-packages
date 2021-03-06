/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * @module types
 */

/**
 * Subtracts `undefined` from any union type `T`. This is the opposite of {@link Optional}.
 */
export type NonOptional<T> = T extends undefined ? never : T;

/**
 * Converts a type `T` that may have optional properties into a type `T` with only required
 * properties (e.g. `undefined` values are not allowed). Explicit `null`s in value unions
 * will still be possible. This is similar to the `Required` builtin mapped type, but also
 * subtracts `undefined` from value union types as well as the optional property declaration.
 *
 * ```
 * type Foo = { bar?: string | undefined | null };
 * type RequiredNonOptionalFoo = RequiredNonOptional<Foo>;
 * // RequiredNonOptionalFoo -> { bar: string | null };
 * ```
 */
export type RequiredNonOptional<T> = T extends object ? { [P in keyof T]-?: NonOptional<T[P]> } : T;

/**
 * Converts a type `T` that may have optional, nullable properties into a new type with only required
 * properties, while also subtracting `null` from all possible property values.
 *
 * ```
 * type Foo = { bar?: string | undefined | null };
 * type RequiredNonNullableFoo = RequiredNonNullable<Foo>;
 * // RequiredNonNullableFoo -> { bar: string };
 * ```
 */
export type RequiredNonNullable<T> = T extends object ? Required<{ [P in keyof T]: NonNullable<T[P]> }> : T;

/**
 * Extracts literally defined property names from a type `T` as a union of key name strings, minus
 * any index signatures.
 */
export type Literals<T> = Extract<
  { [K in keyof T]: string extends K ? never : number extends K ? never : K } extends { [_ in keyof T]: infer U }
    ? U
    : never,
  string
>;
