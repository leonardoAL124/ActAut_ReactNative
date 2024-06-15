import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import styles from '../../theme/styles'
import { push, ref, set, update } from 'firebase/database'
import { dbRealTime } from '../../Configs/firebaseConfig'

// Interface - props del componente
interface Props {
    showModal: boolean,
    setShowModal: Function,
    action: string,
    productId: string,
}

//Interface - Formulario producto
interface FormProduct {
    name: string,
    price: string,
    description: string,
}

export const ProductForm = ({ setShowModal, showModal, action, productId }: Props) => {

    // hook useState: manipulación de la data del formulario
    const [formProduct, setFormProduct] = useState<FormProduct>({
        name: '',
        price: '',
        description: '',
    });

    // Función que cambie los valores del formulario
    const handlerSetValues = (key: string, value: string) => {
        setFormProduct({ ...formProduct, [key]: value });
    }

    // Función guardar el producto
    const handlerSaveProduct = async () => {
        if (!formProduct.name || !formProduct.price || !formProduct.description) {
            return;
        }
        //Guardar los datos en BDD
        //1. Referencia a la BDD y creación de tabla
        const dbRef = ref(dbRealTime, 'products');
        //2. Crear una colección - evitando sobreescritura de la data
        const saveProduct = push(dbRef);
        //3. Almacenaar en la BDD
        try {
            await set(saveProduct, formProduct);
            //4. Limpiar formulario
            setFormProduct({
                name: '',
                price: '',
                description: '',
            });
        } catch (ex) {
            console.log(ex);
        }
        setShowModal(false);
    }

    // Función actualizar data del producto
    const handlerUpdateProduct = async () => {
        console.log(productId);
        if (!productId) {
            console.log(productId);
            return;
        }
        //1. Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'products/' + productId);
        await update(dbRef, { description: formProduct.description, name: formProduct.name, price: formProduct.price });
        setShowModal(false);
    }

    const pressButton = () => {
        if (action == 'Editar Producto') {
            handlerUpdateProduct();
        } else if (action == 'Crear Producto') {
            handlerSaveProduct();
        }
    }

    return (
        <Portal>
            <Modal visible={showModal} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant='headlineMedium'>{action}</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon='close-circle-outline'
                            size={28}
                            onPress={() => setShowModal(false)}
                        />
                    </View>
                </View>
                <Divider />
                <TextInput
                    label='Nombre'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('name', value)}
                />
                <TextInput
                    label='Precio'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('price', value)}
                />
                <TextInput
                    label='Descripción'
                    mode='outlined'
                    multiline={true}
                    numberOfLines={7}
                    onChangeText={(value) => handlerSetValues('description', value)}
                />
                <Button mode='contained' onPress={pressButton}>Enviar</Button>
            </Modal>
        </Portal>
    )
}
