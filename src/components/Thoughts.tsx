import { Table } from "@medusajs/ui";
import { questions } from "../data/questions";
import { fetchAllRows } from "../lib/firebase";
import { useState, useEffect } from "react";

type TableRow = {
    id: string;
    thought: string;
};

export const Thoughts: React.FC = () => {
    const [rows, setRows] = useState<TableRow[]>([]);
    const [counter, setCounter] = useState(0);  

    // fetchAllRows().then(setRows);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await fetchAllRows();
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                thought: doc.data().thought,
            }));
            setRows(data);
            setCounter(data.length);
        };

        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-left">Thoughts ({counter})</h1>
            {/* <button onClick={() => fetchAllRows().then(setRows)}>Refresh</button> */}
            <Table className="text-left">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        {/* <Table.HeaderCell>Customer</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell> */}

                        {/* {questions.map((question, index) => (
                            <Table.HeaderCell key={index}>{question}</Table.HeaderCell>
                        ))} */}

                        <Table.HeaderCell>{questions[0]}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows.map((row, index) => {
                        return (
                            <Table.Row key={row.id}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>
                                    <a href={`/thoughts/${row.id}`}>
                                        {row.thought ?? row.id}
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
        </>
    )
}
