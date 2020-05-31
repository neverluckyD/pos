import React from 'react';
import { Link } from "react-router-dom";
import {
	Portlet,
	PortletBody,
	PortletHeader,
	PortletHeaderToolbar
} from "../../../partials/content/Portlet";
import {
	Button,
	Form,
	Col
} from "react-bootstrap";

export default function ProductDetail(props) {
	return (
		<Portlet>
			<PortletHeader
				title="Thêm sản phẩm"
				toolbar={(
					<PortletHeaderToolbar>
						<Link
							to="/product"
							className="btn btn-secondary"
						>
							Quay lại
							</Link>
						<Button variant="secondary" style={{ margin: "0 5px" }}>Reset</Button>
						<Link
							to="/add_product"
							className="btn btn-primary"
						>
							Lưu
							</Link>
					</PortletHeaderToolbar>
				)
				}
			/>

			<PortletBody>
				<Form>
					<Form.Row>
						<Form.Group as={Col} controlId="productId">
							<Form.Label>Mã sản phẩm</Form.Label>
							<Form.Control type="text"/>
						</Form.Group>

						<Form.Group as={Col} controlId="productName">
							<Form.Label>Tên sản phẩm</Form.Label>
							<Form.Control type="text"/>
						</Form.Group>

						<Form.Group as={Col} controlId="productName">
							<Form.Label>Trạng thái</Form.Label>
							<Form.Control as="select" value="Choose...">
								<option>Choose...</option>
								<option>...</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="productMaterial">
							<Form.Label>Chất liệu</Form.Label>
							<Form.Control as="select" value="Choose...">
								<option>Choose...</option>
								<option>...</option>
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="productColor">
							<Form.Label>Màu sắc</Form.Label>
							<Form.Control as="select" value="Choose...">
								<option>Choose...</option>
								<option>...</option>
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="productPrice">
							<Form.Label>Đơn giá</Form.Label>
							<Form.Control type="text"/>
						</Form.Group>
					</Form.Row>

					<Form.Group controlId="productDescription">
						<Form.Label>Mô tả</Form.Label>
						<Form.Control as="textarea" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
  				</Button>
				</Form>
			</PortletBody>
		</Portlet>
	);
}