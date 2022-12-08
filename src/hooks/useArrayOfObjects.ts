import {useCallback, useEffect, useRef, useState} from 'react';

type ObjectInArray = {key: string};

type WithoutKey<T extends ObjectInArray> = Omit<T, 'key'>;

type UseArrayOfObjectsType<T extends ObjectInArray> = {
  objects: T[];
  onChange: (obj: T) => void;
  onDelete: (obj: T) => void;
  onAdd: (obj: Omit<T, 'key'>) => void;
  init: (objs: T[]) => void;
};
export const useArrayOfObjects = <T extends ObjectInArray>(
  initialData: T[],
): UseArrayOfObjectsType<T> => {
  const [objects, setObjects] = useState<T[]>([]);

  const objectsRef = useRef<T[]>(initialData || []);

  useEffect(() => {
    if (objects !== initialData && objectsRef.current === initialData) {
      setObjects(objectsRef.current);
    }
  }, [initialData, objects]);
  const onChange = useCallback((obj: T) => {
    const {key} = obj;
    const attribute: T = objectsRef.current.find(a => a.key === key) as T;
    const index = objectsRef.current.indexOf(attribute);
    objectsRef.current.splice(index, 1, {...attribute, ...obj});
    objectsRef.current = [...objectsRef.current];
    setObjects(objectsRef.current);
  }, []);

  const onDelete = useCallback((obj: T) => {
    const {key} = obj;
    const attribute: T = objectsRef.current.find(a => a.key === key) as T;
    const index = objectsRef.current.indexOf(attribute);
    objectsRef.current.splice(index, 1);
    objectsRef.current = [...objectsRef.current];
    setObjects(objectsRef.current);
  }, []);

  const onAdd = useCallback((obj: WithoutKey<T>) => {
    objectsRef.current?.push({
      ...obj,
      key: new Date().getTime().toString(),
    } as T);
    objectsRef.current = [...objectsRef.current];
    setObjects(objectsRef.current);
  }, []);

  const init = useCallback((objs: T[]) => {
    objectsRef.current = [...objs];
    objectsRef.current.forEach(o => (o.key = new Date().getTime().toString()));
    setObjects(objectsRef.current);
  }, []);

  return {objects, onChange, onDelete, onAdd, init};
};
