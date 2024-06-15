import React, { useState } from 'react'
import { View } from 'react-native'
import { Avatar, IconButton, Text } from 'react-native-paper'
import { ProductForm } from './ProductForm'
import styles from '../../theme/styles'
import { Product } from '../ProductsScreen'
import { ref, remove } from 'firebase/database'
import { dbRealTime } from '../../Configs/firebaseConfig'

// Interface - props del componente
interface Props {
    product: Product,
}

export const ProductCardComponent = ({product}: Props) => {

    // Función para eliminar la data del producto
    const handlerDeleteProduct = async () => {
        //1. Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'products/' + product.id);
        await remove(dbRef);
    }

    //hook useState: manipular el modal formulario
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <View style={styles.rootProduct}>
                <View>
                    <Text variant='labelLarge'>Nombre: {product.name}</Text>
                    <Text variant='bodyMedium'>Precio: {product.price}</Text>
                    <Text variant='bodyMedium'>Descripción: {product.description}</Text>
                </View>
                <View style={styles.iconEnd}>
                    <IconButton
                        icon="delete-outline"
                        mode='contained'
                        size={32}
                        onPress={handlerDeleteProduct}
                    />
                    <IconButton
                        icon="circle-edit-outline"
                        mode='contained'
                        size={32}
                        onPress={() => setShowModal(true)}
                    />
                </View>
            </View>
            <ProductForm setShowModal={setShowModal} showModal={showModal} action='Editar Producto' productId={product.id} />
        </>
    )
}
