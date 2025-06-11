import { Button, Row, RText, Wrap } from "@/src/libs/by";

export const BottomActionBar = () => (
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
    <Wrap style={{ flex: 1, marginRight: 4}}>
      <Button _kind={"Normal"} _type={"Fill"} _set={{ style: { backgroundColor: '#F3F3F3' } }}>
        <RText style={{ color: '#B80060', fontWeight: 'bold' }}>Add to cart</RText>
      </Button>
    
      <Button _kind={"Oke"} _type={"Fill"} _set={{ style: { backgroundColor: '#B80060' } }}>
        <RText style={{ color: '#fff', fontWeight: 'bold' }}>Buy now</RText>
      </Button>
      <RText style={{ marginLeft: 12, fontWeight: 'bold', fontSize: 16 }}>2.300.000 VND</RText>
    </Wrap>
    
  </Row>
);