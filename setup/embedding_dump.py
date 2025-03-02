import base64
import struct
from typing import Dict, List

from utils.ai import EMBEDDING_DIMENSION


def compress_embeddings_map(deflated_emb_map: Dict[str, List[float]]) -> Dict[str, str]:
    def _compress_floats(f_list: List[float]) -> str:
        byte_buf = struct.pack("%if" % EMBEDDING_DIMENSION, *f_list)
        return base64.b64encode(byte_buf).decode()

    return {k: _compress_floats(v) for k, v in deflated_emb_map.items()}


def deflate_embeddings_map(
    compressed_emb_map: Dict[str, str]
) -> Dict[str, List[float]]:
    def _deflate_floats(f_buf_str: str) -> List[float]:
        byte_buf = base64.b64decode(f_buf_str)
        return list(struct.unpack("%if" % EMBEDDING_DIMENSION, byte_buf))

    return {k: _deflate_floats(v) for k, v in compressed_emb_map.items()}
