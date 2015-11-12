import {
  and,
  between,
  or,
  split,
  splitEnd
} from '@mona/combinators'

import {
  label,
  value
} from '@mona/core'

import {
  parse
} from '@mona/parse'

import {
  eol,
  noneOf,
  string as str,
  text
} from '@mona/strings'

/*
 * CSV Parser
 *
 * Based on parser from http://book.realworldhaskell.org/read/using-parsec.html
 */
export function parseCSV (text, minimumColumns) {
  return parse(csv(minimumColumns), text)
}

export function csv (minimumColumns) {
  return splitEnd(line(minimumColumns), eol())
}

function line (minimumColumns) {
  return split(cell(), str(','), {min: minimumColumns})
}

function cell () {
  return or(quotedCell(), text(noneOf(',\n\r')))
}

function quotedCell () {
  return between(str('"'),
                 label(str('"'), 'closing quote'),
                 text(quotedChar()))
}

function quotedChar () {
  return or(noneOf('"'),
            and(str('""'),
                value('"')))
}
