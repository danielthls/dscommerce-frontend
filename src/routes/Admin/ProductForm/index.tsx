import { useEffect, useState } from 'react';
import './styles.css';
import * as forms from '../../../utils/forms';
import * as productService from '../../../services/ProductService'
import * as categoryService from '../../../services/CategoryService'
import FormInput from '../../../components/FormInput';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import FormTextArea from '../../../components/FormTextArea';
import { CategoryDTO } from '../../../models/Category';
import FormSelect from '../../../components/FormSelect';
import { selectStyles } from '../../../utils/select';

export default function ProductForm() {

    const params = useParams();

    const navigate = useNavigate();

    const [categories, setCategories] = useState<CategoryDTO[]>([])

    const isEditing = params.productId !== 'create';

    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: function (value: string) {
                return /^.{3,20}$/.test(value);
            },
            message: "Favor informar nome de 3 a 80 caracteres"
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
            validation: function (value: any) {
                return Number(value) > 0
            },
            message: "Favor informar valor positivo"
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
        },
        description: {
            value: "",
            id: "description",
            name: "description",
            type: "text",
            placeholder: "Descrição",
            validation: function (value: string) {
                return /^.{10,}$/.test(value);
            },
            message: "A descrição deve ter pelo menos 10 caracteres."
        },
        categories: {
            value: [],
            id: 'categories',
            name: 'categories',
            placeholder: 'Categorias',
            validation: function (value: CategoryDTO[]) {
                return value.length > 0;
            },
            message: 'Escolha pelo menos uma categoria.'
        }
    })

    useEffect(() => {
        categoryService.findAll()
            .then(response => {
                setCategories(response.data)
            })
    }, [])

    useEffect(() => {
        if (isEditing) {
            productService.findById(Number(params.productId))
                .then(response => {
                    setFormData(forms.updateAll(formData, response.data))
                })
        }
    }, [])

    function handleTurnDirty(name: string) {
        const newFormData = forms.toDirtyAndValidate(formData, name)
        setFormData(newFormData)
    }

    function handleInputChange(event: any) {
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value));
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const dataValidatedForm = forms.dirtyAndValidateAll(formData);
        if (forms.hasAnyInvalid(dataValidatedForm)) {
            setFormData(dataValidatedForm);
            return;
        }
        const requestBody = forms.toValues(formData);

        if (isEditing) {
            requestBody.id = params.productId;
        }

        const request = isEditing
            ? productService.updateRequest(requestBody)
            : productService.insertRequest(requestBody)

        request
            .then(response => {
                navigate('/admin/products')
            })
            .catch(error => {
                const newInputs = forms.setBackEndErrors(formData, error.response.data.errors)
                setFormData(newInputs)
            })

    }

    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Dados do produto</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput {...formData.name}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className='dsc-form-error'>{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput {...formData.price}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className='dsc-form-error'>{formData.price.message}</div>
                            </div>
                            <div>
                                <FormInput {...formData.imgUrl}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormSelect
                                    {...formData.categories}
                                    className="dsc-form-control dsc-form-select-container"
                                    styles={selectStyles}
                                    options={categories}
                                    onChange={(obj: any) => {
                                        const newFormData = forms.updateAndValidate(formData, 'categories', obj)
                                        setFormData(newFormData)
                                    }}
                                    onTurnDirty={handleTurnDirty}
                                    isMulti
                                    getOptionLabel={(obj: any) => obj.name}
                                    getOptionValue={(obj: any) => obj.id.toString()}
                                />
                                <div className='dsc-form-error'>{formData.categories.message}</div>
                            </div>
                            <div>
                                <FormTextArea {...formData.description}
                                    className="dsc-form-control dsc-textarea"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className='dsc-form-error'>{formData.description.message}</div>
                            </div>

                        </div>

                        <div className="dsc-product-form-buttons">
                            <Link to="/admin/products">
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                            </Link>
                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}