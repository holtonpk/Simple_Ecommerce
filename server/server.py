
import json
import os
import stripe
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
stripe.api_key = os.getenv('Secret_Key')

from flask import Flask, render_template, jsonify, request


app = Flask(__name__, static_folder='public',
            static_url_path='', template_folder='public')


def calculate_order_amount(orderData):
    subtotal = 0
    for item in orderData["items"]:
        subtotal += (item['price']*item['quantity'])*100
    return round(subtotal+(orderData["shippingMethod"]["rate"]*100)+(orderData["tax"]*100))

CORS(app)

@app.route('/create-payment-intent', methods=['POST'] )
def create_payment():
    try:
        data = json.loads(request.data)
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='usd',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run(port=4242, debug=True)