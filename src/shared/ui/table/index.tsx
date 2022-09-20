import React from "react";

type TableRowProps = React.PropsWithChildren<{
    href: string;
    hrefTitle: React.ReactNode;
    th: React.ReactNode;
}>;

const TableRow: React.FC<TableRowProps> = ({ href, hrefTitle, th, children }) => {
    return (
        <tr>
            <th>{th}</th>
            {/* FIXME: hardcoded */}
            <td>
                <a href={href}>{hrefTitle}</a>
            </td>
            {children}
        </tr>
    );
};

export const Table: React.FC<React.PropsWithChildren> & { Row: typeof TableRow } = ({
    children,
}) => {
    return (
        <table>
            <tbody>{children}</tbody>
        </table>
    );
};

Table.Row = TableRow;
