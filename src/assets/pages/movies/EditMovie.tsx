import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink, useNavigate, useParams } from "react-router"
import ApiClient from "../../../utils/ApiClient"

interface FormMovie{
    judul : string,
    tahunRilis : string,
    sutradara : string
}

interface ResponsData{
    data: {
        _id : string,
        judul : string,
        sutradara : string,
        tahunRilis : string,
        createdBy : string,
        createdAt : string,
        updateAt : string,
        __v : string
    },
    message : string
}

function EditMovie() {
    const params = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState<FormMovie>({
    judul : "",
    tahunRilis : "",
    sutradara : ""

    })

    const fetchMovie = useCallback(async () => {
        const response = await ApiClient.get(`/movie/${params.id}`)

        if(response.status === 200){
            const responseData: ResponsData = response.data
            setForm({
                judul : responseData.data.judul,
                tahunRilis : responseData.data.tahunRilis,
                sutradara : responseData.data.sutradara

            })
        }
    },[params])

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await ApiClient.put(`/movie/${params.id}`, form)
            navigate("/movie",{
                replace: true
            })
           console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [fetchMovie])

    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Edit Movie Page </h2>
            <NavLink to="/" className="btn btn-primary"> List Movie </NavLink>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formJudul">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control 
                    value={form.judul}
                    onChange={handleInputChange}
                        name="judul" 
                        type="text" 
                        placeholder="Judul Film"
                    /> <br></br>
                </Form.Group>
                <Form.Group controlId="formJudul">
                    <Form.Label>Tahun Rilis</Form.Label>
                    <Form.Control
                    value={form.tahunRilis}
                    onChange={handleInputChange}
                        name="tahunRilis" 
                        type="text" 
                        placeholder="Tahun Rilis"
                    /><br></br>
                </Form.Group>
                <Form.Group controlId="formJudul">
                    <Form.Label>Sutradara</Form.Label>
                    <Form.Control
                    value={form.sutradara}
                    onChange={handleInputChange}
                        name="sutradara" 
                        type="text" 
                        placeholder="Sutradara"
                    />
                </Form.Group>
                <br></br>
                <Button type ="submit" variant="primary">Update</Button>                
            </Form> 
        </div>
    </div>
}

export default EditMovie