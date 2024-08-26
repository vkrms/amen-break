import { Table } from "@medusajs/ui";
import { questions } from "../data/questions";
import { useEffect } from "react";
import { store } from "../lib/store";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

export const Thoughts: React.FC = observer(() => {
    useEffect(() => {
        store.fetchData();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-left text-gray-500">Thoughts ({store.rowCount})</h1>

            <Table className="text-left">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>

                        <Table.HeaderCell>{questions[0]}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {store.rows.map((row, index) => {
                        return (
                            <Table.Row key={row.id}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/thoughts/${row.id}`}>
                                        {row.thought ?? row.id}
                                    </Link>                                    
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </>
    )
})
