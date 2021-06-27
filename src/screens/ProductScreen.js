import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const [product ,setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct(){
      const {data} = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }
    fetchProduct()
  },[match.params.id])

  return (
    <div className={'container-fluid'}>
      <Link to="/" className="btn btn-primary my-3 mx-4">
        Go Back
      </Link>
      <Row className={'container-fluid'}>
        <Col md={6} sm={12}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3} sm={12}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews `}
                color={"#f8e825"}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3} sm={12}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col> 
                  <Col> 
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'In Stock': 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ textAlign:'center'}}>
                <Button className='btn-block text-center' disabled={product.countInStock === 0 ? true:false} type='button'>Add to Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
