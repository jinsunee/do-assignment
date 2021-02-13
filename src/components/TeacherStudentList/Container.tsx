import React, {useEffect, useState} from 'react';

import Layout from './Layout';
import {StudentListItemType} from '../../types';
import {studentItems} from '../../../assets/dummy/studentList';

function Page(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<StudentListItemType[]>(studentItems);

  useEffect(() => {
    console.log(studentItems);
    setItems(studentItems);
  }, []);

  return <Layout items={items} loading={loading} />;
}

export default Page;
