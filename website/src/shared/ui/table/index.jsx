import React from 'react'

function TableRow({ href, hrefTitle, th, children }) {
    return (
        <tr>
            <th>{th}</th>
            {/* FIXME: hardcoded */}
            {children}
            <td>
                <a href={href}>{hrefTitle}</a>
            </td>
        </tr>
    )
}

export function Table({ children }) {
    return (
        <table>
              <tbody>
                {children}
              </tbody>
        </table>
    )
}

Table.Row = TableRow;
