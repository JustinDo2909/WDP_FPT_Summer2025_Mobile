import { Button, Row, RText, Wrap } from "@/src/libs/by";
import { formatPrice } from '@/src/libs/share/formatPrice';

export const BottomActionBar = ({product}:{product: IProduct}) => {
  const ss = sStore
  
  return (
  <Row style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  }}>
    <RText style={{ marginLeft: 12, fontWeight: 'bold', fontSize: 20 }}>{formatPrice(product.sale_price ?? product.price)}</RText>

    <Wrap style={{ flex: 1, marginRight: 4, justifyContent: 'flex-end'}}>

      <Button _kind={"Normal"} _type={"Fill"} _set={{ style: { backgroundColor: '#F3F3F3', paddingVertical: 6 } }}>
        <RText style={{ color: '#B80060', fontWeight: 'bold', fontSize: 16 }}>Add to cart</RText>
      </Button>
    
      <Button _kind={"Oke"} _type={"Fill"} _set={{ style: { backgroundColor: '#B80060', paddingVertical: 6 } }}>
        <RText style={{ color: '#fff', fontWeight: 'bold',fontSize: 16  }}>Buy now</RText>
      </Button>
    </Wrap>
    
  </Row>
); 
}