# Logical Data Model

The following LDM(s) represents the current state of the database.

```mermaid
%%{init: {'theme':'dark'}}%%
erDiagram

USER ||--}o CART : has

CART ||--}o CART_ITEM : has

CART_ITEM ||--|| PRODUCT : has
ORDER_ITEM ||--|| PRODUCT : has

USER {
    UUID id PK
    VARCHAR(255) email
    VARCHAR(255) password
    VARCHAR(255) fullName
    TEXT address
    DATETIME created_at
    DATETIME updated_at
}

CART {
    SERIAL id PK
    UUID user_id FK
    ENUM status  "active, archived, checked_out"
    DATETIME checked_out_at
    DATETIME archived_at
    DATETIME created_at
    DATETIME updated_at
}

CART_ITEM {
    SERIAL id PK
    INTEGER cart_id FK
    INTEGER product_id FK
    INTEGER quantity
    DATETIME created_at
    DATETIME updated_at
}


PRODUCT {
    SERIAL id PK
    VARCHAR(255) name
    VARCHAR(255) image
    VARCHAR(255) description
    DECIMAL price
    INTEGER quantity
    DATETIME created_at
    DATETIME updated_at
}


```
