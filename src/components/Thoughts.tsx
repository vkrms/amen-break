import { Table, Button } from "@medusajs/ui";
import { questions } from "../data/questions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusMini } from "@medusajs/icons";
import { useStore } from "../lib/z-store";

export const Thoughts: React.FC = () => {
    const { fetchData, rows } = useStore((state) => ({
        fetchData: state.fetchData,
        rows: state.rows,
    }));

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-left text-gray-500">Thoughts ({rows.length})</h1>

            <Table className="text-left mb-6">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>

                        <Table.HeaderCell>{questions[0]}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows.map((row, index) => {
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

            <Link to="/add">
                <Button>
                    Add
                    <PlusMini/>
                </Button>
            </Link>
        </>
    )
}
