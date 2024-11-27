import React, { useEffect, useState } from 'react';
import fetchGetData from '../Client/Clinet';
import { useParams } from 'react-router-dom';

const TeacherList = () => {
    const [Teacherdata, setTeacherdata] = useState([]);
    const { branch } = useParams();

    useEffect(() => {
        const getTeachers = async () => {
            try {
                const response = await fetchGetData(`/view/teachers/${branch}`);
                setTeacherdata(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getTeachers();
    }, [branch]);

    return (
        <div>
            {Teacherdata.map((item, index) => (
                <p key={index}>{item.subject}</p>
            ))}
        </div>
    );
};

export default TeacherList;