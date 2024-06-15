import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { FAB, Text, Divider } from 'react-native-paper';
import { ProductCardComponent } from './Components/ProductCardComponent'
import styles from '../theme/styles'
import { onValue, ref } from 'firebase/database'
import { dbRealTime } from '../Configs/firebaseConfig'
import { ProductForm } from './Components/ProductForm'

// Interface - product
export interface Product {
    id: string,
    name: string,
    description: string,
    price: string,
}

export const ProductsScreen = () => {

    //hook useEffect: capturar la data del usuario autenticado
    useEffect(() => {
        // Renderizar los mensajes
        getAllProducts();
    }, [])

    //hook useState: manipular el modal formulario
    const [showModal, setShowModal] = useState<boolean>(false);

    // hook useState: lista de productos
    const [products, setProducts] = useState<Product[]>([]);

    // Función para consultar la data desde firebase
    const getAllProducts = () => {
        //1. Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'products');
        //2. Consultar data
        onValue(dbRef, (snapshot) => {
            //3. Capturar data
            const data = snapshot.val(); // Obtener los valores en un formato esperado
            // Verificación de data
            if (!data) return; // Verificando que este vacia
            //4. Obtener keys data
            const getKeys = Object.keys(data);
            //5. Crear un arreglo lista de mensajes
            const listProducts: Product[] = [];
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key };
                listProducts.push(value);
            })
            // Agregando la data al arreglo messages hook
            setProducts(listProducts);
        })
    }

    return (
        <>
            <View style={styles.rootHome}>
                <Text style={styles.headerTitle} variant='headlineMedium'>Bienvenido!</Text>
                <Text style={styles.subtitle} variant='bodyLarge'>Has ingresado como administrador, puedes realizar operaciones CRUD en los productos</Text>
                <Text style={styles.subtitleAdvertance} variant='bodyLarge'>Realiza operaciones con cuidado!</Text>
                <Divider/>
                <View>
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductCardComponent product={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <FAB
                icon="plus"
                style={styles.fabProduct}
                onPress={() => setShowModal(true)}
            />
            <ProductForm setShowModal={setShowModal} showModal={showModal} action="Crear Producto" productId='' />
        </>
    )
}
